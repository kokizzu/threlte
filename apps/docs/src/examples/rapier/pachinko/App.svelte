<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { gameState } from './gameState.svelte'

  let debug = $state(false)
</script>

<Pane
  position="fixed"
  title=""
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
</Pane>

<svelte:window
  onkeydown={(event) => {
    if (event.code !== 'Space' || event.repeat) return
    event.preventDefault()
    gameState.holding = true
  }}
  onkeyup={(event) => {
    if (event.code !== 'Space') return
    event.preventDefault()
    gameState.holding = false
  }}
/>

<div>
  <Canvas>
    <World gravity={[0, -18, 0]}>
      <Scene {debug} />
    </World>
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    background: radial-gradient(ellipse at center, #1a1530 0%, #0a0814 70%);
  }
</style>
