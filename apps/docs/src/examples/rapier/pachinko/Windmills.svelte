<script
  lang="ts"
  module
>
  const barGeometry = new BoxGeometry(0.9, 0.07, 0.25)
  const barMaterial = new MeshStandardMaterial({
    color: '#ff5fa2',
    metalness: 0.6,
    roughness: 0.3,
    emissive: '#ff2266',
    emissiveIntensity: 0.6
  })
  const hubGeometry = new CylinderGeometry(0.08, 0.08, 0.32, 14)
  const hubMaterial = new MeshStandardMaterial({
    color: '#fff0c0',
    metalness: 0.9,
    roughness: 0.18,
    emissive: '#ffaa00',
    emissiveIntensity: 0.7
  })
</script>

<script lang="ts">
  import { BoxGeometry, CylinderGeometry, MeshStandardMaterial } from 'three'
  import Windmill from './Windmill.svelte'
  import { WINDMILLS } from './gameState.svelte'
</script>

{#each WINDMILLS as w}
  <Windmill
    position={w.position}
    initialAngularVelocity={w.spin}
    {barGeometry}
    {barMaterial}
    {hubGeometry}
    {hubMaterial}
  />
{/each}
