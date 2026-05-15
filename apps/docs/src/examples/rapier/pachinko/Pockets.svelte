<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Attractor, Collider, RigidBody } from '@threlte/rapier'
  import { FIELD_HEIGHT, FIELD_WIDTH, CHANNEL_X, ballRegistry, gameState } from './gameState.svelte'

  type PocketKind = 'low' | 'mid' | 'high' | 'jackpot'

  const POCKET_SPECS: Record<PocketKind, { color: string; value: number }> = {
    low: { color: '#5a8ad0', value: 10 },
    mid: { color: '#65d99c', value: 25 },
    high: { color: '#ffaa55', value: 50 },
    jackpot: { color: '#ff3da6', value: 250 }
  }

  // A weak attractor hovers above the jackpot pocket — a touch of rigged
  // pachinko physics. Strength is per-frame impulse magnitude (≈ instant Δv),
  // so even small numbers bias trajectories noticeably at 60Hz.
  const JACKPOT_STRENGTH = 0.004
  const JACKPOT_RANGE = 1.8
  const JACKPOT_ORB_Y = 0.4 // height above the jackpot pocket plate

  // Pockets line the bottom of the playfield, left of the launch channel.
  const playfieldLeft = -FIELD_WIDTH / 2 + 0.2
  const playfieldRight = CHANNEL_X - 0.5
  const pocketY = -FIELD_HEIGHT / 2 + 0.5
  const playfieldSpan = playfieldRight - playfieldLeft
  const layout: PocketKind[] = ['mid', 'high', 'low', 'jackpot', 'low', 'high', 'mid']
  const slotWidth = playfieldSpan / layout.length
  const pocketHalfW = slotWidth / 2 - 0.05

  // Build each pocket's data and its sensor handler up front. The handler
  // closes over the pocket's kind/value, and exporting it as a stable property
  // on the array element keeps Collider's onsensorenter prop reference stable
  // across re-renders (would otherwise destroy and re-create the collider).
  const pockets = layout.map((kind, i) => {
    const spec = POCKET_SPECS[kind]
    return {
      kind,
      x: playfieldLeft + slotWidth / 2 + i * slotWidth,
      ...spec,
      onenter: ({ targetCollider }: { targetCollider: { handle: number } }) => {
        const despawn = ballRegistry.get(targetCollider.handle)
        if (!despawn) return // not a ball — ignore strays
        despawn()
        gameState.score += spec.value
        gameState.lastPocketHit = kind
      }
    }
  })

  const jackpot = pockets.find((p) => p.kind === 'jackpot')!

  // The orb above the jackpot pulses to telegraph the attractor.
  let orbPulse = $state(0)
  useTask((delta) => {
    orbPulse = (orbPulse + delta * 2.4) % (Math.PI * 2)
  })
</script>

<RigidBody type="fixed">
  <!-- Dividers between pockets -->
  {#each pockets as pocket, i (pocket)}
    {#if i > 0}
      <T.Group position={[pocket.x - slotWidth / 2, pocketY + 0.18, 0]}>
        <Collider
          shape="cuboid"
          args={[0.05, 0.2, 0.18]}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[0.1, 0.4, 0.3]} />
          <T.MeshStandardMaterial
            color="#3a2a55"
            metalness={0.5}
            roughness={0.3}
          />
        </T.Mesh>
      </T.Group>
    {/if}
  {/each}
</RigidBody>

<!-- Pocket sensors + glow plates. Sensors are free colliders (no parent
     RigidBody) — sensor events work the same either way. -->
{#each pockets as pocket (pocket)}
  <T.Group position={[pocket.x, pocketY, 0]}>
    <Collider
      shape="cuboid"
      args={[pocketHalfW, 0.18, 0.2]}
      sensor
      onsensorenter={pocket.onenter}
    />
    <T.Mesh position={[0, -0.1, -0.1]}>
      <T.BoxGeometry args={[pocketHalfW * 2, 0.25, 0.05]} />
      <T.MeshStandardMaterial
        color={pocket.color}
        emissive={pocket.color}
        emissiveIntensity={0.8}
        metalness={0.3}
        roughness={0.4}
      />
    </T.Mesh>
  </T.Group>
{/each}

<!-- Jackpot attractor — a soft gravity well sits just above the jackpot
     pocket so balls drifting through the lower playfield get nudged toward
     it. The orb is a pulsing visual telegraph; the Attractor is what does
     the actual pulling. -->
<T.Group position={[jackpot.x, pocketY + JACKPOT_ORB_Y, 0.1]}>
  <Attractor
    strength={JACKPOT_STRENGTH}
    range={JACKPOT_RANGE}
    gravityType="linear"
  />
  <T.Mesh scale={1 + 0.12 * Math.sin(orbPulse)}>
    <T.IcosahedronGeometry args={[0.12, 0]} />
    <T.MeshStandardMaterial
      color={jackpot.color}
      emissive={jackpot.color}
      emissiveIntensity={2 + 0.7 * Math.sin(orbPulse)}
      metalness={0.6}
      roughness={0.2}
    />
  </T.Mesh>
  <T.PointLight
    color={jackpot.color}
    intensity={2 + Math.sin(orbPulse)}
    distance={1.4}
  />
</T.Group>
