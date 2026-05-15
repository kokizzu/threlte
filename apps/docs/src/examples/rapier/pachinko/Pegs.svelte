<script
  lang="ts"
  module
>
  // Hoisted so all pegs share one geometry/material — a small but meaningful saving when there are ~120 pegs.
  const pegGeometry = new CylinderGeometry(0.07, 0.07, 0.4, 12)
  const pegMaterial = new MeshStandardMaterial({
    color: '#e8d68a',
    metalness: 0.85,
    roughness: 0.22,
    emissive: '#5a4310',
    emissiveIntensity: 0.4
  })
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody } from '@threlte/rapier'
  import { CylinderGeometry, MeshStandardMaterial } from 'three'
  import {
    CHANNEL_X,
    FIELD_HEIGHT,
    FIELD_WIDTH,
    WINDMILLS,
    WINDMILL_CLEARANCE
  } from './gameState.svelte'

  type Peg = { x: number; y: number }

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
    WINDMILLS.some(({ position: [wx, wy] }) => {
      const dx = x - wx
      const dy = y - wy
      return dx * dx + dy * dy < clearanceSquared
    })

  for (let r = 0; r < rows; r++) {
    const y = fieldBottom + r * verticalSpacing
    if (y > fieldTop) break
    const offset = r % 2 === 0 ? 0 : horizontalSpacing / 2
    for (let c = 0; c < cols; c++) {
      const x = fieldLeft + c * horizontalSpacing + offset
      if (x > fieldRight) break
      if (insideWindmillClearance(x, y)) continue
      pegs.push({ x, y })
    }
  }
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
      />
      <T.Mesh
        castShadow
        geometry={pegGeometry}
        material={pegMaterial}
      />
    </T.Group>
  {/each}
</RigidBody>
