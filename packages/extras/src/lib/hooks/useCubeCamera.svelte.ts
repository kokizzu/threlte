import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'

const DEFAULT_NEAR = 1
const DEFAULT_FAR = 1000

/**
 * creates a derived CubeCamera instance
 * @example
 * ```svelte
 * <script>
 * let near = $state(0.1)
 * let far = $state(1000)
 * const renderTarget = new WebGLCubeRenderTarget(512);
 * const camera = useCubeCamera(() => near, () => far, () => renderTarget);
 * useTask(() => { camera.update(renderer, scene); })
 * </script>
 * ```
 * @return an object with a property `current` that is a getter to the derived cubeCamera
 */
export const useCubeCamera = (
  renderTarget: () => WebGLCubeRenderTarget,
  near = () => DEFAULT_FAR,
  far = () => DEFAULT_FAR
) => {
  const camera = $derived(new CubeCamera(DEFAULT_NEAR, DEFAULT_FAR, renderTarget()))

  $effect(() => {
    const _near = near()
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.near = _near
        child.updateProjectionMatrix()
      }
    }
  })

  $effect(() => {
    const _far = far()
    for (const child of camera.children) {
      if (isInstanceOf(child, 'PerspectiveCamera')) {
        child.far = _far
        child.updateProjectionMatrix()
      }
    }
  })

  return {
    get current() {
      return camera
    }
  }
}
