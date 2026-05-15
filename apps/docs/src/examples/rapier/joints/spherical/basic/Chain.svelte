<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody, useSphericalJoint } from '@threlte/rapier'

  const segments = 10
  const spacing = 0.4
  const radius = 0.18
  const wreckingRadius = 0.4
  const beadDensity = 1
  const wreckingDensity = 3
  // center-to-center distance between bead 6 and wrecking ball (radii + small gap)
  const wreckingOffset = radius + wreckingRadius + 0.05
  // local-x anchor on the wrecking ball pointing back at the previous bead
  const WRECKING_ANCHOR = wreckingOffset - spacing / 2

  // bodies[0] = fixed anchor, bodies[1..7] = small beads, bodies[8] = wrecking ball
  const bodies = $state<(RapierRigidBody | undefined)[]>(
    Array.from({ length: segments + 1 }, () => undefined)
  )
  const allReady = $derived(bodies.every(Boolean))

  // Chain extends to the -x direction, so each upper-side anchor is on its left
  // surface (-x in local), each lower-side anchor on its right (+x).
  const joints = Array.from({ length: segments }, (_, i) => {
    if (i === 0) {
      return useSphericalJoint([0, 0, 0], [spacing / 2, 0, 0])
    }
    if (i === segments - 1) {
      return useSphericalJoint([-spacing / 2, 0, 0], [WRECKING_ANCHOR, 0, 0])
    }
    return useSphericalJoint([-spacing / 2, 0, 0], [spacing / 2, 0, 0])
  })

  $effect(() => {
    if (allReady) {
      joints.forEach((joint, i) => {
        joint.rigidBodyA.set(bodies[i])
        joint.rigidBodyB.set(bodies[i + 1])
      })
    }
  })
</script>

<CollisionGroups
  memberships={[1]}
  filter={[0]}
>
  <T.Group position={[0, 5, 0]}>
    <RigidBody
      type="fixed"
      bind:rigidBody={bodies[0]}
    >
      <T.Mesh>
        <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
        <T.MeshStandardMaterial color="#222" />
      </T.Mesh>
    </RigidBody>
  </T.Group>

  {#each { length: segments - 1 }, i (i)}
    <T.Group position={[-spacing / 2 - i * spacing, 5, 0]}>
      <RigidBody
        bind:rigidBody={bodies[i + 1]}
        linearDamping={0.1}
        angularDamping={0.1}
      >
        <Collider
          shape="ball"
          args={[radius]}
          density={beadDensity}
        />
        <T.Mesh castShadow>
          <T.SphereGeometry args={[radius, 16, 12]} />
          <T.MeshStandardMaterial color="#8B5A2B" />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  {/each}

  <T.Group position={[-spacing / 2 - (segments - 2) * spacing - wreckingOffset, 5, 0]}>
    <RigidBody
      bind:rigidBody={bodies[segments]}
      linearDamping={0.1}
      angularDamping={0.1}
    >
      <Collider
        shape="ball"
        args={[wreckingRadius]}
        density={wreckingDensity}
      />
      <T.Mesh castShadow>
        <T.SphereGeometry args={[wreckingRadius, 24, 16]} />
        <T.MeshStandardMaterial
          color="#222"
          metalness={0.8}
          roughness={0.3}
        />
      </T.Mesh>
    </RigidBody>
  </T.Group>
</CollisionGroups>
