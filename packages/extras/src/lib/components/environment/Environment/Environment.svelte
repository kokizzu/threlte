<script
  lang="ts"
  module
>
  const loaders: {
    exr?: EXRLoader
    hdr?: RGBELoader
    tex?: TextureLoader
  } = {}
</script>

<script lang="ts">
  import { T, useCache, useThrelte } from '@threlte/core'
  import { EquirectangularReflectionMapping, TextureLoader } from 'three'
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
  import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js'
  import { useSuspense } from '../../../suspense/useSuspense.js'
  import { useEnvironment } from '../utils/useEnvironment.svelte.js'
  import type { EquirectangularEnvironmentProps } from './types.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  const ctx = useThrelte()

  let {
    skybox = $bindable(),
    texture = $bindable(null),
    ground = false,
    isBackground = false,
    scene = ctx.scene,
    url
  }: EquirectangularEnvironmentProps = $props()

  const suspend = useSuspense()
  const cache = useCache()

  useEnvironment(
    () => scene,
    () => texture,
    () => isBackground
  )

  const isEXR = $derived(url?.endsWith('exr') ?? false)
  const isHDR = $derived(url?.endsWith('hdr') ?? false)

  const loader = $derived.by(() => {
    if (isEXR) {
      loaders.exr ??= new EXRLoader()
      return loaders.exr
    }
    if (isHDR) {
      loaders.hdr ??= new RGBELoader()
      return loaders.hdr
    }
    loaders.tex ??= new TextureLoader()
    return loaders.tex
  })

  $effect.pre(() => {
    const suspendedTexture = suspend(
      cache.remember(() => {
        return loader.loadAsync(url)
      }, [url])
    )

    const promise = suspendedTexture.then((texture) => {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    })

    return () => {
      promise.then((texture) => {
        texture.dispose()
      })
    }
  })
</script>

{#if ground}
  {@const options = ground === true ? {} : ground}
  {#if texture}
    <T
      is={GroundedSkybox}
      bind:ref={skybox}
      args={[texture, options.height ?? 1, options.radius ?? 1, options.resolution ?? 128]}
    />
  {/if}
{/if}
