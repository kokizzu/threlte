<!--
	This component is a port of the component [`<SoftShadows>` from drei](https://github.com/pmndrs/drei/blob/master/src/core/softShadows.tsx)
	Original comment:
		Integration and compilation: @N8Programs
		Inspired by:
			https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shadowmap_pcss.html
			https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-17-efficient-soft-edged-shadows-using
			https://developer.download.nvidia.com/whitepapers/2008/PCSS_Integration.pdf
			https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pcss.html [spidersharma03]
			https://spline.design/
		Concept:
			https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/
		Vogel Disk Implementation:
			https://www.shadertoy.com/view/4l3yRM [ashalah]
		High-Frequency Noise Implementation:
			https://www.shadertoy.com/view/tt3fDH [spawner64]
-->
<script lang="ts">
  import { useThrelte, useTask } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { BasicShadowMap, ShaderChunk } from 'three'

  const { renderer, scene } = useThrelte()

  interface Props {
    /** Size of the light source (the larger the softer the light), default: 25 */
    size?: number
    /** Depth focus, use it to shift the focal point (where the shadow is the sharpest), default: 0 (the beginning) */
    focus?: number
    /** Number of samples (more samples less noise but more expensive), default: 10 */
    samples?: number
  }

  let { size = 25, focus = 0, samples = 10 }: Props = $props()

  // get the original shader chunk
  const original = ShaderChunk.shadowmap_pars_fragment

  // Three.js modernized shadow mapping between r175 and r183 (PRs #32181/#32303
  // /#32407/#32443): `unpackRGBAToDepth` was removed, the PCF branch now uses
  // `sampler2DShadow` (hardware comparison only — no raw depth reads), and the
  // BASIC branch reads depth directly via `.r`. Detect once and pick the right
  // sampling path + injection target.
  const isLegacyChunk = original.includes('unpackRGBAToDepth')
  const sampleDepth = isLegacyChunk
    ? 'unpackRGBAToDepth(texture2D(shadowMap, '
    : 'texture2D(shadowMap, '
  const sampleDepthSuffix = isLegacyChunk ? '))' : ').r'

  let pcss = $derived(`
		uniform float pcssTime;

		#define PENUMBRA_FILTER_SIZE float(${size})
		#define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
		vec3 randRGB(vec2 uv) {
			return vec3(
				fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
				fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
				fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
			);
		}

		vec3 lowPassRandRGB(vec2 uv) {
			// 3x3 convolution (average)
			// can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
			vec3 result = vec3(0);
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
			result *= 0.111111111; // 1.0 / 9.0
			return result;
		}
		vec3 highPassRandRGB(vec2 uv) {
			// by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
			// hp(x) = x - lp(x)
			return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
		}


		vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
			const float goldenAngle = 2.399963f; // radians
			float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
			float theta = float(sampleIndex) * goldenAngle + angle;
			float sine = sin(theta);
			float cosine = cos(theta);
			return vec2(cosine, sine) * r;
		}
		float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
			return (zReceiver - zBlocker) / zBlocker;
		}
		float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float blockerDepthSum = float(${focus});
			float blockers = 0.0;

			int j = 0;
			vec2 offset = vec2(0.);
			float depth = 0.;

			#pragma unroll_loop_start
			for(int i = 0; i < ${samples}; i ++) {
				offset = (vogelDiskSample(j, ${samples}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
				depth = ${sampleDepth}uv + offset${sampleDepthSuffix};
				if (depth < compare) {
					blockerDepthSum += depth;
					blockers++;
				}
				j++;
			}
			#pragma unroll_loop_end

			if (blockers > 0.0) {
				return blockerDepthSum / blockers;
			}
			return -1.0;
		}


		float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float shadow = 0.0f;
			int j = 0;
			vec2 vogelSample = vec2(0.0);
			vec2 offset = vec2(0.0);
			#pragma unroll_loop_start
			for (int i = 0; i < ${samples}; i++) {
				vogelSample = vogelDiskSample(j, ${samples}, angle) * texelSize;
				offset = vogelSample * (1.0 + filterRadius * float(${size}));
				shadow += step( zReceiver, ${sampleDepth}uv + offset${sampleDepthSuffix} );
				j++;
			}
			#pragma unroll_loop_end
			return shadow * 1.0 / ${samples}.0;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z; // Assumed to be eye-space z in this code
			// Shift the noise seed every frame so the shimmer pattern moves; the
			// eye integrates the per-frame noise into a smoother shadow.
			float angle = highPassRandRGB(gl_FragCoord.xy + vec2(pcssTime * 67.0, pcssTime * 113.0)).r * PI2;
			float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
			if (avgBlockerDepth == -1.0) {
				return 1.0;
			}
			float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
			return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
	}`)

  // Per-shader `pcssTime` uniform refs, populated as materials compile via the
  // `onBeforeCompile` hook below. We update each one every frame.
  const timeUniforms: { value: number }[] = []

  const wrapOnBeforeCompile = (material: any) => {
    if (material.userData.__pcssOriginalOnBeforeCompile === undefined) {
      material.userData.__pcssOriginalOnBeforeCompile = material.onBeforeCompile
    }
    const originalOnBeforeCompile = material.userData.__pcssOriginalOnBeforeCompile
    material.onBeforeCompile = function (shader: any, r: any) {
      originalOnBeforeCompile?.call(this, shader, r)
      shader.uniforms.pcssTime = { value: 0 }
      timeUniforms.push(shader.uniforms.pcssTime)
    }
  }

  const eachMaterial = (callback: (material: any) => void) => {
    scene.traverse((object: any) => {
      const material = object.material
      if (!material) return
      if (Array.isArray(material)) {
        for (const m of material) callback(m)
      } else {
        callback(material)
      }
    })
  }

  // Mark every material for re-link without disposing it. Disposal would strip
  // `onBeforeCompile` injections and break materials that share uniform
  // references with user code; `needsUpdate` discards only the cached program
  // and re-runs `onBeforeCompile` on the next render.
  const recompile = () => {
    timeUniforms.length = 0
    eachMaterial((material) => {
      wrapOnBeforeCompile(material)
      material.needsUpdate = true
    })
  }

  $effect.pre(() => {
    // On modern (r183+) chunks the PCF branch binds the shadow map as
    // `sampler2DShadow`, which doesn't allow raw depth reads — PCSS needs
    // those, so force `BasicShadowMap` (which binds as `sampler2D`). Legacy
    // chunks use `sampler2D` for every shadow type, so we leave the user's
    // configured shadow type alone.
    let previousShadowMapType: typeof renderer.shadowMap.type | null = null
    if (!isLegacyChunk) {
      previousShadowMapType = renderer.shadowMap.type
      renderer.shadowMap.type = BasicShadowMap
    }

    let modified = original.replace('#ifdef USE_SHADOWMAP', `#ifdef USE_SHADOWMAP\n${pcss}`)
    if (isLegacyChunk) {
      // Legacy chunks have a single getShadow() with branches per shadow type;
      // inject right inside `if (frustumTest) {` ahead of the PCF branch so
      // the early `return` short-circuits whichever branch was selected.
      modified = modified.replace(
        '#if defined( SHADOWMAP_TYPE_PCF )',
        '\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )'
      )
    } else {
      // Modern chunks have a dedicated BASIC getShadow() with a `sampler2D
      // shadowMap` that we can read raw depth from; inject before its depth
      // lookup so PCSS replaces the per-pixel comparison.
      modified = modified.replace(
        'float depth = texture2D( shadowMap, shadowCoord.xy ).r;',
        `return PCSS( shadowMap, shadowCoord );\n\t\t\t\tfloat depth = texture2D( shadowMap, shadowCoord.xy ).r;`
      )
    }
    ShaderChunk.shadowmap_pars_fragment = modified
    recompile()

    return () => {
      if (previousShadowMapType !== null) {
        renderer.shadowMap.type = previousShadowMapType
      }
    }
  })

  // Drive the noise seed forward every frame. Per-frame variation lets the
  // eye/display integrate the noisy PCSS samples into a smoother-looking
  // shadow even though no temporal accumulation buffer is used.
  let pcssTimeValue = 0
  useTask((delta) => {
    pcssTimeValue += delta
    for (let i = 0; i < timeUniforms.length; i++) {
      timeUniforms[i]!.value = pcssTimeValue
    }
  })

  onDestroy(() => {
    ShaderChunk.shadowmap_pars_fragment = original
    eachMaterial((material) => {
      if (material.userData.__pcssOriginalOnBeforeCompile !== undefined) {
        material.onBeforeCompile = material.userData.__pcssOriginalOnBeforeCompile
        delete material.userData.__pcssOriginalOnBeforeCompile
        material.needsUpdate = true
      }
    })
  })
</script>

<!--
	@component
	This component injects Percentage-Closer Soft Shadows (PCSS) into
	Three.js' shader chunk. Mounting and unmounting this component will lead to
	all shaders being be re-compiled, although it will only cause overhead if
	`<SoftShadows>` is mounted after the scene has already rendered, if it mounts
	with everything else in your scene shaders will compile naturally.
-->
