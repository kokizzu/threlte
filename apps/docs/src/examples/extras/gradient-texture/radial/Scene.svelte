<script lang="ts">
  import type { ColorRepresentation, ToneMapping, Wrapping } from 'three'
  import type { GradientStop } from '@threlte/extras'
  import { DoubleSide } from 'three'
  import { RadialGradientTexture, OrbitControls } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'

  type SceneProps = {
    canvasSize: number
    gradientEndColor: ColorRepresentation
    gradientInnerRadius: number
    gradientOuterRadius: number
    gradientStartColor: ColorRepresentation
    sceneClearColor: ColorRepresentation
    sceneToneMapping: ToneMapping
    textureCenterX: number
    textureCenterY: number
    textureOffsetX: number
    textureOffsetY: number
    textureRepeatX: number
    textureRepeatY: number
    textureRotation: number
    textureWrapS: Wrapping
    textureWrapT: Wrapping
  }

  let {
    canvasSize,
    gradientInnerRadius,
    gradientOuterRadius,
    gradientEndColor,
    gradientStartColor,
    sceneClearColor,
    sceneToneMapping,
    textureCenterX,
    textureCenterY,
    textureOffsetX,
    textureOffsetY,
    textureRepeatX,
    textureRepeatY,
    textureRotation,
    textureWrapS,
    textureWrapT
  }: SceneProps = $props()

  let stops: GradientStop[] = $derived([
    { color: gradientStartColor, offset: 0 },
    { color: gradientEndColor, offset: 1 }
  ])

  const { invalidate, renderer, toneMapping } = useThrelte()

  $effect(() => {
    toneMapping.set(sceneToneMapping)
    invalidate()
  })

  $effect(() => {
    renderer.setClearColor(sceneClearColor)
    invalidate()
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.Mesh scale={2}>
  <T.PlaneGeometry />
  <T.MeshBasicMaterial side={DoubleSide}>
    <RadialGradientTexture
      width={canvasSize}
      height={canvasSize}
      innerRadius={gradientInnerRadius}
      outerRadius={gradientOuterRadius}
      center.x={textureCenterX}
      center.y={textureCenterY}
      offset.x={textureOffsetX}
      offset.y={textureOffsetY}
      repeat.x={textureRepeatX}
      repeat.y={textureRepeatY}
      rotation={textureRotation}
      wrapS={textureWrapS}
      wrapT={textureWrapT}
      {stops}
    />
  </T.MeshBasicMaterial>
</T.Mesh>
