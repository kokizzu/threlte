import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'
import { untrack } from 'svelte'

/**
 * creates a derived CubeCamera instance
 *
 * @example
 *
 * ```svelte
 * <script>
 * let near = $state(0.1);
 * let far = $state(1000);
 * const renderTarget = new WebGLCubeRenderTarget(512);
 * const camera = useCubeCamera(() => near, () => far, () => renderTarget);
 *
 * // render to the target each frame
 * useTask(() => { camera.update(renderer, scene); })
 * </script>
 * ```
 * @return an object with a property `current` that is a getter to the derived cubeCamera
 */
export const useCubeCamera = (
  resolution: () => number | undefined,
  near: () => number | undefined,
  far: () => number | undefined
) => {
  const currentResolution = $derived(resolution() ?? 256)
  const currentNear = $derived(near() ?? 0.1)
  const currentFar = $derived(far() ?? 2000)

  const renderTarget = new WebGLCubeRenderTarget(untrack(() => currentResolution))

  const camera = new CubeCamera(
    untrack(() => currentNear),
    untrack(() => currentFar),
    renderTarget
  )

  $effect(() => {
    renderTarget.setSize(currentResolution, currentResolution)
  })

  $effect(() => {
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.near = currentNear
        child.far = currentFar
        child.updateProjectionMatrix()
      }
    }
  })

  $effect(() => {
    return () => {
      renderTarget.dispose()
    }
  })

  return {
    camera,
    renderTarget
  }
}
