<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Point, List, Checkbox } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  type Subject = 'plant' | 'orb' | 'flowers'

  type Preset = {
    speed: number
    factor: number
    randomness: number
    bendiness: number
    anchorEnabled: boolean
    anchor: [number, number, number]
  }

  // Each subject's anchor is in its own local geometry space — the plant
  // base sits ~0.76 units up the model, the flower model already has its
  // base at 0, and the orb doesn't anchor anything.
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
  let speed = $state(presets.plant.speed)
  let factor = $state(presets.plant.factor)
  let randomness = $state(presets.plant.randomness)
  let bendiness = $state(presets.plant.bendiness)
  let anchorEnabled = $state(presets.plant.anchorEnabled)
  let anchor = $state<[number, number, number]>(presets.plant.anchor)

  // Apply the subject's preset whenever it changes. This deliberately
  // clobbers slider state — switching subjects is meant to reset the
  // tuning to something sensible for that shape.
  $effect(() => {
    const preset = presets[subject]
    speed = preset.speed
    factor = preset.factor
    randomness = preset.randomness
    bendiness = preset.bendiness
    anchorEnabled = preset.anchorEnabled
    anchor = preset.anchor
  })
</script>

<div>
  <Canvas>
    <Scene
      {subject}
      {speed}
      {factor}
      {randomness}
      {bendiness}
      anchor={anchorEnabled ? anchor : undefined}
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
    bind:value={speed}
    label="speed"
    min={0}
    max={5}
    step={0.01}
  />
  <Slider
    bind:value={factor}
    label="factor"
    min={0}
    max={3}
    step={0.01}
  />
  <Slider
    bind:value={randomness}
    label="randomness"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={bendiness}
    label="bendiness"
    min={0}
    max={1}
    step={0.01}
  />

  <Checkbox
    bind:value={anchorEnabled}
    label="anchor"
  />
  <Point
    bind:value={anchor}
    label="anchor xyz"
    min={-2}
    max={4}
    step={0.01}
    disabled={!anchorEnabled}
  />
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
