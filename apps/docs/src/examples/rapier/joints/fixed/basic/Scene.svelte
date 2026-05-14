<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import Hammer from './Hammer.svelte'
  import Tower from './Tower.svelte'

  let { debug, resetKey }: { debug: boolean; resetKey: number } = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 7, 18]}
  fov={60}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
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
  <Tower
    position={[-3, 0, 0]}
    color="#FE3D00"
  />
  <Tower
    position={[3, 0, 0]}
    color="#335086"
    jointed
  />
  <Hammer
    position={[-10, 3, 0]}
    rotation={[0, 0, -Math.PI / 6]}
    velocity={[15, 0, 0]}
  />
  <Hammer
    position={[10, 3, 0]}
    rotation={[0, 0, Math.PI / 6]}
    velocity={[-15, 0, 0]}
  />
{/key}

<T.Group position={[0, -0.5, 0]}>
  <RigidBody type="fixed">
    <Collider
      shape="cuboid"
      args={[12, 0.5, 5]}
    />
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[24, 1, 10]} />
      <T.MeshStandardMaterial color="#888" />
    </T.Mesh>
  </RigidBody>
</T.Group>
