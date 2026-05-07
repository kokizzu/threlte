import { useThrelte } from '@threlte/core'
import type { Scene } from 'three'

export const useEnvironment = (
  scene: () => Scene,
  environment: () => Scene['environment'] = () => null,
  isBackground = () => false
) => {
  const { invalidate } = useThrelte()

  $effect(() => {
    if (!isBackground()) return
    const _scene = scene()
    const lastBackground = _scene.background
    _scene.background = environment()
    invalidate()
    return () => {
      _scene.background = lastBackground
      invalidate()
    }
  })

  $effect(() => {
    const _scene = scene()
    const lastEnvironment = _scene.environment
    _scene.environment = environment()
    invalidate()
    return () => {
      _scene.environment = lastEnvironment
      invalidate()
    }
  })
}
