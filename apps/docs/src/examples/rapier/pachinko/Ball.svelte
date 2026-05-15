<script
  lang="ts"
  module
>
  const geometry = new SphereGeometry(0.14, 16, 12)
  const material = new MeshStandardMaterial({
    color: '#e8e6f0',
    metalness: 0.9,
    roughness: 0.18
  })

  // Module-scope so all balls reuse the same arrays — RigidBody's $effects re-apply
  // configuration whenever the prop reference changes, and inline array literals in
  // the template create fresh references on every parent render. Sharing one frozen
  // tuple keeps Object.is true and short-circuits those re-applications.
  const enabledTranslations: [boolean, boolean, boolean] = [true, true, false]
  const enabledRotations: [boolean, boolean, boolean] = [false, false, true]
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider, CollisionGroups, RigidBody } from '@threlte/rapier'
  import type {
    Collider as RapierCollider,
    RigidBody as RapierRigidBody
  } from '@dimforge/rapier3d-compat'
  import { MeshStandardMaterial, SphereGeometry } from 'three'
  import { untrack } from 'svelte'
  import { ballRegistry } from './gameState.svelte'
  import { spawnQueue } from './spawnQueue.svelte'

  let {
    id,
    position,
    linearVelocity
  }: {
    id: number
    position: [number, number, number]
    linearVelocity: [number, number, number]
  } = $props()

  let collider = $state<RapierCollider>()
  let rigidBody = $state<RapierRigidBody>()

  // Stable handler — created once per instance.
  const despawn = () => spawnQueue.despawn(id)

  // Apply the launch velocity exactly once, when the body becomes available.
  // We deliberately don't bind to `linearVelocity` here: RigidBody's prop-bound
  // setLinvel effect would otherwise re-fire whenever the parent's keyed
  // {#each} re-evaluated this child, resetting every in-flight ball.
  $effect(() => {
    if (!rigidBody) return
    untrack(() => {
      rigidBody!.setLinvel({ x: linearVelocity[0], y: linearVelocity[1], z: 0 }, true)
    })
  })

  $effect(() => {
    if (!collider) return
    const handle = collider.handle
    ballRegistry.set(handle, despawn)
    return () => {
      ballRegistry.delete(handle)
    }
  })
</script>

<!--
  Balls live in group 1 and collide with the playfield (group 0) and with each
  other (group 1) — that ball-on-ball "clack" is what makes pachinko feel
  right, even though it's the most expensive bit of the simulation.
-->
<CollisionGroups
  memberships={[1]}
  filter={[0, 1]}
>
  <T.Group {position}>
    <RigidBody
      type="dynamic"
      bind:rigidBody
      {enabledTranslations}
      {enabledRotations}
      linearDamping={0.05}
      angularDamping={0.4}
      ccd
      onsleep={despawn}
    >
      <Collider
        bind:collider
        shape="ball"
        args={[0.14]}
        restitution={0.55}
        friction={0.15}
        density={3}
      />
      <T.Mesh
        castShadow
        {geometry}
        {material}
      />
    </RigidBody>
  </T.Group>
</CollisionGroups>
