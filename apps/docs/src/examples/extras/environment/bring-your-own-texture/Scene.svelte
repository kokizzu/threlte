<script lang="ts">
  import { Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/Addons.js'
  import { T } from '@threlte/core'

  const loader = new RGBELoader()
  const map = loader
    .loadAsync('/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr')
    .then((texture) => {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls
    enableDamping
    enableZoom={false}
  />
</T.PerspectiveCamera>

<T.Mesh>
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
  <T.SphereGeometry />
</T.Mesh>

{#await map then texture}
  <Environment
    isBackground
    {texture}
  />
{/await}
