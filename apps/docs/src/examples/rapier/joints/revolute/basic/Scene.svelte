<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Pendulum from './Pendulum.svelte'

  let { debug, resetKey }: { debug: boolean; resetKey: number } = $props()

  const stack = Array.from({ length: 4 }, (_, i) => i)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[6, 4, 10]}
  fov={50}
>
  <OrbitControls
    enableDamping
    target={[0, 2, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>
<T.AmbientLight intensity={0.4} />

{#if debug}
  <Debug />
{/if}

{#key resetKey}
  <Pendulum />

  {#each stack as i}
    <T.Group position={[-0.5, 0.5 + i, 0]}>
      <RigidBody>
        <Collider
          shape="cuboid"
          args={[0.5, 0.5, 0.5]}
        />
        <T.Mesh castShadow>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial color="#335086" />
        </T.Mesh>
      </RigidBody>
    </T.Group>
  {/each}
{/key}

<T.Group position={[0, -0.5, 0]}>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[10, 0.5, 5]}
    />
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[20, 1, 10]} />
      <T.MeshStandardMaterial color="#888" />
    </T.Mesh>
  </RigidBody>
</T.Group>
