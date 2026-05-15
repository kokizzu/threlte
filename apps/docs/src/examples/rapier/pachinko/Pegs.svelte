<script
  lang="ts"
  module
>
  // Geometry is shared across every peg — instantiation cost matters when
  // there are ~100 of them. Materials are per-peg (see below).
  const pegGeometry = new CylinderGeometry(0.07, 0.07, 0.4, 12)

  const PEG_BASE_EMISSIVE = 0.4
  const PEG_FLASH_EMISSIVE = 3.5
  // emissiveIntensity decays back to base at this many units / second
  const PEG_DECAY_PER_SEC = 9
  // Minimum contact force (Newtons) to trigger a flash. Below this the hit
  // is a graze and we ignore it via `contactForceEventThreshold`.
  const PEG_CONTACT_THRESHOLD = 1.5
</script>

<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { CylinderGeometry, MeshStandardMaterial } from 'three'
  import {
    CHANNEL_X,
    FIELD_HEIGHT,
    FIELD_WIDTH,
    windmills,
    WINDMILL_CLEARANCE
  } from './gameState.svelte'

  interface Peg {
    x: number
    y: number
    material: MeshStandardMaterial
    onContact: (event: { totalForceMagnitude: number }) => void
  }

  const pegs: Peg[] = []
  // Diamond / staggered grid within the playfield (left of the launch channel).
  // The grid is anchored to the BOTTOM of the field — if FIELD_HEIGHT grows,
  // the new space appears above the topmost row rather than between the pegs
  // and the pockets, which would leave the playfield bottom-heavy.
  const rows = 14
  const cols = 9
  const horizontalSpacing = 0.55
  const verticalSpacing = 0.5
  const fieldLeft = -FIELD_WIDTH / 2 + 0.6
  const fieldRight = CHANNEL_X - 0.7
  const fieldBottom = -FIELD_HEIGHT / 2 + 1.4
  const fieldTop = FIELD_HEIGHT / 2 - 1.6

  const clearanceSquared = WINDMILL_CLEARANCE * WINDMILL_CLEARANCE
  const insideWindmillClearance = (x: number, y: number) =>
    windmills.some(({ position: [wx, wy] }) => {
      const dx = x - wx
      const dy = y - wy
      return dx * dx + dy * dy < clearanceSquared
    })

  for (let r = 0; r < rows; r += 1) {
    const y = fieldBottom + r * verticalSpacing
    if (y > fieldTop) break
    const offset = r % 2 === 0 ? 0 : horizontalSpacing / 2
    for (let c = 0; c < cols; c += 1) {
      const x = fieldLeft + c * horizontalSpacing + offset
      if (x > fieldRight) break
      if (insideWindmillClearance(x, y)) continue

      // Each peg owns its material so we can flash one without flashing them
      // all. Identical params compile to the same shader program — the cost
      // is mostly per-frame uniform setup, which is fine for ~100 pegs.
      const material = new MeshStandardMaterial({
        color: '#e8d68a',
        metalness: 0.85,
        roughness: 0.22,
        emissive: '#ffe080',
        emissiveIntensity: PEG_BASE_EMISSIVE
      })

      // Stable closure so the Collider's oncontact prop reference doesn't
      // change every render (which would force a collider re-create).
      const onContact = (event: { totalForceMagnitude: number }) => {
        if (event.totalForceMagnitude < PEG_CONTACT_THRESHOLD) return
        material.emissiveIntensity = PEG_FLASH_EMISSIVE
      }

      pegs.push({ x, y, material, onContact })
    }
  }

  // Single decay pass per frame across all pegs — only the small set whose
  // emissive is above baseline does any work.
  useTask((delta) => {
    const decay = PEG_DECAY_PER_SEC * delta
    for (const peg of pegs) {
      if (peg.material.emissiveIntensity > PEG_BASE_EMISSIVE) {
        peg.material.emissiveIntensity = Math.max(
          PEG_BASE_EMISSIVE,
          peg.material.emissiveIntensity - decay
        )
      }
    }
  })
</script>

<RigidBody type="fixed">
  {#each pegs as peg (peg)}
    <T.Group
      position={[peg.x, peg.y, 0.05]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <Collider
        shape="cylinder"
        args={[0.2, 0.07]}
        restitution={0.6}
        friction={0.05}
        contactForceEventThreshold={PEG_CONTACT_THRESHOLD}
        oncontact={peg.onContact}
      />
      <T.Mesh
        castShadow
        geometry={pegGeometry}
        material={peg.material}
      />
    </T.Group>
  {/each}
</RigidBody>
