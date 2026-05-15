<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import {
    FIELD_HEIGHT,
    FIELD_WIDTH,
    CHANNEL_X,
    ballRegistry,
    gameState
  } from './gameState.svelte'

  type PocketKind = 'low' | 'mid' | 'high' | 'jackpot'

  const POCKET_SPECS: Record<PocketKind, { color: string; value: number }> = {
    low: { color: '#5a8ad0', value: 10 },
    mid: { color: '#65d99c', value: 25 },
    high: { color: '#ffaa55', value: 50 },
    jackpot: { color: '#ff3da6', value: 250 }
  }

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
</script>

<RigidBody type="fixed">
  <!-- Dividers between pockets -->
  {#each pockets as pocket, i (i)}
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
{#each pockets as pocket}
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
