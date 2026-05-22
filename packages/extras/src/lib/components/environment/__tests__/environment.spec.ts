import { render } from '@threlte/test'
import { tick } from 'svelte'
import { Color, Scene, Texture } from 'three'
import { describe, expect, it } from 'vitest'
import Environment from '../Environment/Environment.svelte'

describe('<Environment>', () => {
  it('can set scene.background without replacing scene.environment', async () => {
    const scene = new Scene()
    const originalBackground = new Color('red')
    const originalEnvironment = new Texture()
    const texture = new Texture()

    scene.background = originalBackground
    scene.environment = originalEnvironment

    const { unmount } = render(Environment, {
      props: {
        isBackground: true,
        isEnvironment: false,
        scene,
        texture
      }
    })

    await tick()

    expect(scene.background).toBe(texture)
    expect(scene.environment).toBe(originalEnvironment)

    unmount()
    await tick()

    expect(scene.background).toBe(originalBackground)
    expect(scene.environment).toBe(originalEnvironment)
  })
})
