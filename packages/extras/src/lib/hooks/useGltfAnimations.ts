import { currentWritable, useTask, observe, type CurrentWritable } from '@threlte/core'
import { derived, writable, type Writable } from 'svelte/store'
import { AnimationMixer, type AnimationAction, type Object3D } from 'three'
import type { ThrelteGltf } from '../types/types.js'

type Root = Object3D
type GltfStore = Writable<ThrelteGltf | undefined>

type UseGltfAnimationsReturnType<Actions> = {
  gltf: Writable<ThrelteGltf | undefined>
  mixer: AnimationMixer
  actions: CurrentWritable<Actions>
  root: CurrentWritable<Root | undefined>
}

const isRoot = (value: unknown): value is Root => !!(value as { isObject3D?: boolean })?.isObject3D

const isGltfStore = (value: unknown): value is GltfStore =>
  typeof (value as { subscribe?: unknown })?.subscribe === 'function'

const isGetter = <T>(value: unknown): value is () => T => typeof value === 'function'

/**
 * Convenience hook to use animations loaded with the `<GLTF>` component or the
 * `useGltf` hook.
 *
 * Pass `gltf` as a getter so reads are tracked through runes automatically.
 * The optional `root` getter binds animations to a different `Object3D` than
 * the gltf's own scene — useful when retargeting clips onto a separate rig.
 *
 * ### Example with `useGltf`
 *
 * ```svelte
 * <script lang="ts">
 *   import { useGltf, useGltfAnimations } from '@threlte/extras'
 *
 *   const gltf = useGltf('/Bengal.glb')
 *   const { actions } = useGltfAnimations<'Run' | 'Idle'>(() => $gltf)
 *
 *   $effect(() => {
 *     $actions.Run?.play()
 *   })
 * </script>
 * ```
 *
 * ### Example with `<GLTF>` and `bind:gltf`
 *
 * ```svelte
 * <script lang="ts">
 *   import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'
 *
 *   let gltf = $state<ThrelteGltf | undefined>()
 *   const { actions } = useGltfAnimations<'Run'>(() => gltf)
 * </script>
 *
 * <GLTF url="/Bengal.glb" bind:gltf />
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  gltf: () => ThrelteGltf | undefined,
  root?: () => Object3D | undefined
): UseGltfAnimationsReturnType<Actions>
/**
 * @deprecated Pass `gltf` as a getter function instead. This signature will be
 * removed in Threlte 9.
 *
 * ```ts
 * // Before
 * const { gltf, actions } = useGltfAnimations()
 * // <GLTF url="/model.glb" bind:gltf={$gltf} />
 *
 * // After
 * let gltf = $state<ThrelteGltf>()
 * const { actions } = useGltfAnimations(() => gltf)
 * // <GLTF url="/model.glb" bind:gltf />
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(root?: Root): UseGltfAnimationsReturnType<Actions>
/**
 * @deprecated Pass `gltf` as a getter function instead. This signature will be
 * removed in Threlte 9.
 *
 * ```ts
 * // Before
 * const gltf = useGltf('/model.glb')
 * const { actions } = useGltfAnimations(gltf)
 *
 * // After
 * const gltf = useGltf('/model.glb')
 * const { actions } = useGltfAnimations(() => $gltf)
 * ```
 */
export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(gltf: GltfStore, root?: Root): UseGltfAnimationsReturnType<Actions>

export function useGltfAnimations<
  T extends string,
  Actions extends Partial<Record<T, AnimationAction>> = Partial<Record<T, AnimationAction>>
>(
  gltfArg?: (() => ThrelteGltf | undefined) | GltfStore | Root,
  rootArg?: (() => Object3D | undefined) | Root
): UseGltfAnimationsReturnType<Actions> {
  const gltfGetter =
    !isGltfStore(gltfArg) && isGetter<ThrelteGltf | undefined>(gltfArg) ? gltfArg : undefined
  const rootGetter = isGetter<Object3D | undefined>(rootArg) ? rootArg : undefined

  const gltf: Writable<ThrelteGltf | undefined> = isGltfStore(gltfArg)
    ? gltfArg
    : writable<ThrelteGltf | undefined>(gltfGetter?.())

  const initialRoot = isRoot(gltfArg) ? gltfArg : isRoot(rootArg) ? rootArg : rootGetter?.()
  const root = currentWritable<Root | undefined>(initialRoot)

  if (gltfGetter) {
    observe(
      () => [gltfGetter()],
      ([value]) => {
        gltf.set(value)
      }
    )
  }

  if (rootGetter) {
    observe(
      () => [rootGetter()],
      ([value]) => {
        root.set(value)
      }
    )
  }

  const actualRoot = derived([root, gltf], ([root, gltf]) => {
    return root ?? gltf?.scene
  })

  const actions = currentWritable<Actions>({} as Actions)
  const mixer = new AnimationMixer(undefined as unknown as Object3D)

  observe(
    () => [gltf, actualRoot],
    ([gltf, actualRoot]) => {
      if (!gltf || !gltf.animations.length || !actualRoot) return

      const newActions = gltf.animations.reduce((acc, clip) => {
        const action = mixer.clipAction(clip, actualRoot)
        return {
          ...acc,
          [clip.name as T]: action
        }
      }, {} as Actions)
      actions.set(newActions)

      return () => {
        Object.values(newActions).forEach((a) => {
          const action = a as AnimationAction
          action.stop()
          mixer.uncacheClip(action.getClip())
        })
      }
    }
  )

  useTask(
    (delta) => {
      mixer.update(delta)
    },
    { running: () => Object.keys(actions).length > 0 }
  )

  return {
    /**
     * @deprecated This property will be removed in Threlte 9
     */
    gltf,

    /**
     * @deprecated This property will be removed in Threlte 9
     */
    root,
    mixer,
    actions
  }
}
