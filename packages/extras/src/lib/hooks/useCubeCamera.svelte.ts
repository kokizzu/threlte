import { CubeCamera, WebGLCubeRenderTarget } from 'three'
import { isInstanceOf } from '@threlte/core'

const DEFAULT_NEAR = 1
const DEFAULT_FAR = 1000

const isPerspectiveCamera = (object: any) => isInstanceOf(object, 'PerspectiveCamera')

/**
 * creates a `CubeCamera` instance
 * `near` and `far`, and `resolution` are getters so you can use $state()
 * the camera's `renderTarget` is disposed when the component unmounts.
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
      if (isPerspectiveCamera(child)) {
        child.near = _near
        child.updateProjectionMatrix()
      }
    }
  })

  $effect(() => {
    const _far = far()
    for (const child of camera.children) {
      if (isPerspectiveCamera(child)) {
        child.far = _far
        child.updateProjectionMatrix()
      }
    }
  })

  return {
    // this has to be a getter or closure since cube the camera is derived
    camera: () => camera
  }
}
