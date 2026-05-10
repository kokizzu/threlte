<script lang="ts">
  import type { CubeCameraProps } from './types.js'
  import { Group, WebGLCubeRenderTarget } from 'three'
  import { observe, T, useTask, useThrelte } from '@threlte/core'
  import { useCubeCamera } from '../../hooks/useCubeCamera.svelte.js'

  let {
    background = 'auto',
    far = 1000,
    fog = 'auto',
    frames = Infinity,
    near = 0.1,
    onupdatestart,
    onupdatestop,
    resolution = 256,
    children,
    ref = $bindable(),
    ...props
  }: CubeCameraProps = $props()

  const renderTarget = new WebGLCubeRenderTarget()
  $effect(() => {
    return () => {
      renderTarget.dispose()
    }
  })

  export const camera = useCubeCamera(
    () => renderTarget,
    () => near,
    () => far
  )

  $effect(() => {
    renderTarget.setSize(resolution, resolution)
  })

  const { renderer, scene } = useThrelte()

  const group = new Group()
  const inner = new Group()

  let count = 0
  let running = $state(false)

  export const update = () => {
    // if frames === Infinity, the task will run indefinitely
    if (count < frames) {
      const lastBackground = scene.background
      if (background !== 'auto') scene.background = background

      const lastFog = scene.fog
      if (fog !== 'auto') scene.fog = fog

      inner.visible = false
      camera.current.update(renderer, scene)

      scene.background = lastBackground
      scene.fog = lastFog
      inner.visible = true
      count += 1
    } else {
      running = false
      onupdatestop?.()
    }
  }

  useTask(update, {
    running: () => running
  })

  export const restart = () => {
    if (running) {
      onupdatestop?.()
    }

    count = 0
    running = true
    onupdatestart?.()
  }

  // if any of these props update, the task will need to be restarted
  observe(() => [background, far, near, fog, frames], restart)
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T is={camera.current} />
  <T is={inner}>
    {@render children?.({
      camera,
      ref: inner,
      restart,
      update
    })}
  </T>
</T>
