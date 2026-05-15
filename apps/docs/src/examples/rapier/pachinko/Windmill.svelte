<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
  import type { BoxGeometry, CylinderGeometry, MeshStandardMaterial } from 'three'

  let {
    position,
    initialAngularVelocity,
    barGeometry,
    barMaterial,
    hubGeometry,
    hubMaterial
  }: {
    position: [number, number, number]
    initialAngularVelocity: number
    barGeometry: BoxGeometry
    barMaterial: MeshStandardMaterial
    hubGeometry: CylinderGeometry
    hubMaterial: MeshStandardMaterial
  } = $props()

  // anchorA / anchorB both [0,0,0]: both bodies sit at `position`, joint pivots
  // around their shared origin. axis [0,0,1] spins in the XY play plane.
  const { rigidBodyA, rigidBodyB } = useRevoluteJoint([0, 0, 0], [0, 0, 0], [0, 0, 1])
</script>

<T.Group {position}>
  <!-- Fixed pivot (no collider — just an anchor point for the joint) -->
  <RigidBody
    type="fixed"
    bind:rigidBody={$rigidBodyA}
  >
    <T.Mesh
      castShadow
      geometry={hubGeometry}
      material={hubMaterial}
      rotation={[Math.PI / 2, 0, 0]}
    />
  </RigidBody>

  <!-- Spinning bar — light + low-damping so a ball hit imparts real spin
       rather than a stiff nudge. The revolute joint already pins translation;
       we still lock all axes on the body itself as belt-and-suspenders. -->
  <RigidBody
    type="dynamic"
    bind:rigidBody={$rigidBodyB}
    angularVelocity={[0, 0, initialAngularVelocity]}
    enabledTranslations={[false, false, false]}
    enabledRotations={[false, false, true]}
    angularDamping={0.05}
  >
    <Collider
      shape="cuboid"
      args={[0.45, 0.035, 0.12]}
      restitution={0.7}
      friction={0.05}
      density={1}
    />
    <T.Mesh
      castShadow
      geometry={barGeometry}
      material={barMaterial}
    />
  </RigidBody>
</T.Group>
