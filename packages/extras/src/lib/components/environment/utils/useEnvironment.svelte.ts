import { useThrelte } from '@threlte/core'
import type { Scene } from 'three'

export const useEnvironment = (
  scene: () => Scene,
  environment: () => Scene['environment'] | undefined,
  isBackground: () => boolean
) => {
  const { invalidate } = useThrelte()

  $effect(() => {
    const currentScene = scene()
    const { background: lastBackground, environment: lastEnvironment } = currentScene

    const currentIsBackground = isBackground()
    const currentEnvironment = environment() ?? null

    currentScene.environment = currentEnvironment

    if (currentIsBackground) {
      currentScene.background = currentEnvironment
    }

    invalidate()

    return () => {
      currentScene.environment = lastEnvironment

      if (currentIsBackground) {
        currentScene.background = lastBackground
      }

      invalidate()
    }
  })
}
