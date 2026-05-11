<script
  lang="ts"
  module
>
  export const hdrs = {
    industrial: 'industrial_sunset_puresky_1k.hdr',
    workshop: 'aerodynamics_workshop_1k.hdr',
    puresky: 'mpumalanga_veld_puresky_1k.hdr'
  } as const

  const hdrPath = '/textures/equirectangular/hdr/'

  const isHdrKey = (u: PropertyKey): u is keyof typeof hdrs => {
    return u in hdrs
  }
</script>

<script lang="ts">
  import type { Group } from 'three'
  import { CubeCamera, Environment, Grid, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T, useLoader, useTask } from '@threlte/core'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  interface Props {
    frames?: number
    hdr?: 'auto' | keyof typeof hdrs
    metalness?: number
    far?: number
    near?: number
    resolution?: number
    roughness?: number
  }

  let {
    frames = Infinity,
    hdr = 'auto',
    metalness = 1,
    near = 0.1,
    far = 1000,
    resolution = 256,
    roughness = 0
  }: Props = $props()

  const colors = ['#ff00ff', '#ffff00', '#00ffff'] as const

  const increment = (2 * Math.PI) / colors.length
  const radius = 3

  let time = 0
  const groups: Group[] = []
  useTask((delta) => {
    time += delta
    let i = 0
    for (const group of groups) {
      group.position.setY(2 * Math.sin(time + i))
      i += 1
    }
  })

  const loader = useLoader(RGBELoader, {
    extend(loader) {
      loader.setPath(hdrPath)
    }
  })

  const backgrounds = loader.load(hdrs, {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[8, 5, 8]}
/>

<OrbitControls
  enableDamping
  target.y={0.5}
  autoRotate
  enablePan={false}
  enableZoom={false}
  autoRotateSpeed={0.1}
/>

<Environment url={`${hdrPath}shanghai_riverside_1k.hdr`} />

<Grid
  position.y={-3}
  sectionColor="#fff"
  cellColor="#fff"
/>

{#each colors as color, index}
  {@const r = increment * index}
  <T.Mesh
    position.x={radius * Math.cos(r)}
    position.y={index}
    position.z={radius * Math.sin(r)}
  >
    <T.MeshStandardMaterial {color} />
    <T.SphereGeometry />
  </T.Mesh>
{/each}

{#await backgrounds then backgroundMap}
  {@const background = isHdrKey(hdr) ? backgroundMap[hdr] : hdr}
  {#each colors, index}
    {@const r = Math.PI + increment * index}
    <T.Group
      position.x={radius * Math.cos(r)}
      position.z={radius * Math.sin(r)}
      oncreate={(ref) => {
        groups.push(ref)
      }}
    >
      <CubeCamera
        {background}
        {frames}
        {near}
        {far}
        {resolution}
      >
        {#snippet children({ renderTarget })}
          <T.Mesh>
            <T.SphereGeometry />
            <T.MeshStandardMaterial
              {roughness}
              {metalness}
              envMap={renderTarget.texture}
            />
          </T.Mesh>
        {/snippet}
      </CubeCamera>
    </T.Group>
  {/each}
{/await}
