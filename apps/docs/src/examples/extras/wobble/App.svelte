<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Point, List, Checkbox } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  type Subject = 'plant' | 'orb' | 'flowers'

  interface Preset {
    speed: number
    factor: number
    randomness: number
    bendiness: number
    anchorEnabled: boolean
    anchor: [number, number, number]
  }

  const presets: Record<Subject, Preset> = {
    plant: {
      speed: 2.5,
      factor: 0.3,
      randomness: 0.4,
      bendiness: 0.4,
      anchorEnabled: true,
      anchor: [0, 0.76, 0]
    },
    orb: {
      speed: 2.5,
      factor: 3,
      randomness: 0.1,
      bendiness: 0.5,
      anchorEnabled: false,
      anchor: [0, 0, 0]
    },
    flowers: {
      speed: 5,
      factor: 3,
      randomness: 0.75,
      bendiness: 1,
      anchorEnabled: true,
      anchor: [0, 0, 0]
    }
  }

  let subject = $state<Subject>('plant')
  let options = $state(presets.plant)

  $effect(() => {
    options = presets[subject]
  })
</script>

<div>
  <Canvas>
    <Scene
      {subject}
      {...options}
      anchor={options.anchorEnabled ? options.anchor : undefined}
    />
  </Canvas>
</div>

<Pane
  title="Wobble"
  position="fixed"
>
  <List
    bind:value={subject}
    label="subject"
    options={{ Plant: 'plant', Orb: 'orb', Flowers: 'flowers' }}
  />
  <Slider
    bind:value={options.speed}
    label="speed"
    min={0}
    max={5}
    step={0.01}
  />
  <Slider
    bind:value={options.factor}
    label="factor"
    min={0}
    max={3}
    step={0.01}
  />
  <Slider
    bind:value={options.randomness}
    label="randomness"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={options.bendiness}
    label="bendiness"
    min={0}
    max={1}
    step={0.01}
  />

  <Checkbox
    bind:value={options.anchorEnabled}
    label="anchor"
  />
  <Point
    bind:value={options.anchor}
    label="anchor xyz"
    min={-2}
    max={4}
    step={0.01}
    disabled={!options.anchorEnabled}
  />
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
