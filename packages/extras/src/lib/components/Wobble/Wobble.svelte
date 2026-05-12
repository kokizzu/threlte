<script
  module
  lang="ts"
>
  import {
    Mesh,
    MeshDepthMaterial,
    MeshDistanceMaterial,
    RGBADepthPacking,
    Vector3,
    type Material,
    type WebGLProgramParametersWithUniforms
  } from 'three'

  type WobbleUniforms = {
    time: { value: number }
    factor: { value: number }
    frequency: { value: number }
    noise: { value: number }
    pulse: { value: number }
    drift: { value: number }
    bendiness: { value: number }
    axis: { value: Vector3 }
    anchor: { value: number }
    hasAnchor: { value: boolean }
    forceDirection: { value: Vector3 }
    hasForceDirection: { value: boolean }
  }

  // Ashima 3D simplex noise + fBM + a Rodrigues rotation helper. All inlined
  // so users don't need to wire shader code themselves.
  const WOBBLE_HELPERS_GLSL = `
    vec3 wobbleMod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobbleMod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobblePermute(vec4 x) { return wobbleMod289(((x * 34.0) + 10.0) * x); }
    vec4 wobbleTaylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float wobbleSnoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = wobbleMod289(i);
      vec4 p = wobblePermute(wobblePermute(wobblePermute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = wobbleTaylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    // Fractal Brownian motion: 4 octaves of simplex noise at doubling
    // frequencies and halving amplitudes. The standard recipe for organic,
    // wind-like motion. Normalized so the result stays roughly in [-1, 1].
    float wobbleFbm(vec3 v) {
      float sum = 0.0;
      float amp = 1.0;
      float freq = 1.0;
      for (int i = 0; i < 4; i++) {
        sum += amp * wobbleSnoise(v * freq);
        amp *= 0.5;
        freq *= 2.0;
      }
      return sum / 1.875;
    }

    // Rodrigues' rotation formula: rotate v around unit-vector k by angle.
    vec3 wobbleRotate(vec3 v, vec3 k, float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
    }
  `

  const WOBBLE_CACHE_KEY = '__wobble_v2'

  const patchWobbleShader = (
    shader: WebGLProgramParametersWithUniforms,
    uniforms: WobbleUniforms,
    { withNormals }: { withNormals: boolean }
  ) => {
    shader.uniforms.time = uniforms.time
    shader.uniforms.factor = uniforms.factor
    shader.uniforms.frequency = uniforms.frequency
    shader.uniforms.noise = uniforms.noise
    shader.uniforms.pulse = uniforms.pulse
    shader.uniforms.drift = uniforms.drift
    shader.uniforms.bendiness = uniforms.bendiness
    shader.uniforms.axis = uniforms.axis
    shader.uniforms.anchor = uniforms.anchor
    shader.uniforms.hasAnchor = uniforms.hasAnchor
    shader.uniforms.forceDirection = uniforms.forceDirection
    shader.uniforms.hasForceDirection = uniforms.hasForceDirection

    shader.vertexShader = `
      uniform float time;
      uniform float factor;
      uniform float frequency;
      uniform float noise;
      uniform float pulse;
      uniform float drift;
      uniform float bendiness;
      uniform vec3 axis;
      uniform float anchor;
      uniform bool hasAnchor;
      uniform vec3 forceDirection;
      uniform bool hasForceDirection;
      ${WOBBLE_HELPERS_GLSL}
      ${shader.vertexShader}
    `

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `// Build an orthonormal basis aligned to the wobble axis. The two
       // perpendicular axes (across1/across2) span the "across" plane that
       // bend, noise, and force direction all live in.
       vec3 wobbleAxis = normalize(axis);
       vec3 wobbleRef = abs(wobbleAxis.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
       vec3 across1 = normalize(cross(wobbleAxis, wobbleRef));
       vec3 across2 = cross(wobbleAxis, across1);

       float along = dot(position, wobbleAxis);
       vec2 acrossPos = vec2(dot(position, across1), dot(position, across2));

       // For InstancedMesh / BatchedMesh, fold each instance's "across"
       // translation into the noise sample so instances wobble out of
       // phase. #ifdef guards keep us safe on non-instanced meshes.
       vec2 instanceOffset = vec2(0.0);
       #ifdef USE_INSTANCING
         vec3 instTrans = vec3(instanceMatrix[3].x, instanceMatrix[3].y, instanceMatrix[3].z);
         instanceOffset = vec2(dot(instTrans, across1), dot(instTrans, across2));
       #endif
       #ifdef USE_BATCHING
         vec3 batchTrans = vec3(batchingMatrix[3].x, batchingMatrix[3].y, batchingMatrix[3].z);
         instanceOffset = vec2(dot(batchTrans, across1), dot(batchTrans, across2));
       #endif

       float weight = hasAnchor ? abs(along - anchor) : 1.0;
       vec2 spatialSample = (acrossPos + instanceOffset) * frequency;

       float sineWobble = sin(1.0 + time + along * frequency + instanceOffset.x);
       // Domain warping: sample fBM once to perturb the input of a second
       // fBM call. Breaks up the grid-aligned feel of straight noise and
       // gives fluid, swirling motion (iquilezles's classic trick).
       vec3 noiseInput = vec3(spatialSample * 0.6, time * 0.5);
       float warpScale = 0.5;
       vec3 warpedInput = noiseInput + warpScale * vec3(
         wobbleFbm(noiseInput),
         wobbleFbm(noiseInput + vec3(5.2, 1.3, 0.0)),
         wobbleFbm(noiseInput + vec3(0.0, 2.1, 4.6))
       );
       float noiseWobble = wobbleFbm(warpedInput);
       float wobble = mix(sineWobble, noiseWobble, noise);
       // Slow time-only fBM modulates magnitude when "pulse > 0". Instance
       // offset feeds in so neighbours pulse out of sync.
       float pulseNoise = wobbleFbm(vec3(time * 0.3 + instanceOffset.x * 0.3, 0.0, instanceOffset.y * 0.3)) * 0.5 + 0.5;
       float gust = mix(1.0, 0.1 + 1.4 * pulseNoise, pulse);
       float theta = wobble * gust / 2.0 * factor * weight;

       // Twist around the wobble axis.
       vec3 twisted = wobbleRotate(position, wobbleAxis, theta);
       ${withNormals ? 'vec3 twistedNormal = wobbleRotate(vNormal, wobbleAxis, theta);' : ''}

       // Bend: tilt in the across-plane toward forceDirection.
       float pivotAlong = hasAnchor ? anchor : 0.0;
       vec3 anchorPoint = wobbleAxis * pivotAlong;
       vec3 forceDir;
       if (hasForceDirection) {
         vec3 fd = forceDirection - dot(forceDirection, wobbleAxis) * wobbleAxis;
         float fdLen = length(fd);
         forceDir = fdLen > 0.0001 ? fd / fdLen : across1;
       } else {
         // Slow drift scaled by "drift". At 0 the direction holds steady,
         // at 1 it sweeps the full circle over time.
         float driftAngle = wobbleFbm(vec3(time * 0.08, 0.0, 0.0)) * 3.14159 * drift;
         forceDir = across1 * cos(driftAngle) + across2 * sin(driftAngle);
       }
       vec3 bendAxisVec = cross(wobbleAxis, forceDir);
       // Bend uses its own slow oscillation — macroscopic sway is much
       // slower than the per-vertex twist flutter.
       float bendUniform = sin(time * 0.25 + instanceOffset.x * 0.2);
       float bendPerVertex = wobbleFbm(vec3(spatialSample * 0.3, time * 0.15));
       float bendWobble = mix(bendUniform, bendPerVertex, noise);
       float bendTheta = bendWobble * gust * factor * weight / 2.0;
       vec3 fromAnchor = position - anchorPoint;
       vec3 bent = wobbleRotate(fromAnchor, bendAxisVec, bendTheta) + anchorPoint;

       vec3 transformed = mix(twisted, bent, bendiness);
       ${
         withNormals
           ? `vec3 bentNormal = wobbleRotate(vNormal, bendAxisVec, bendTheta);
            vNormal = mix(twistedNormal, bentNormal, bendiness);`
           : ''
       }`
    )
  }

  const applyWobble = (material: Material, uniforms: WobbleUniforms) => {
    const originalOnBeforeCompile = material.onBeforeCompile
    const originalCacheKey = material.customProgramCacheKey

    material.onBeforeCompile = function (shader, renderer) {
      originalOnBeforeCompile.call(this, shader, renderer)
      patchWobbleShader(shader, uniforms, { withNormals: true })
    }
    material.customProgramCacheKey = function () {
      return `${originalCacheKey.call(this)}|${WOBBLE_CACHE_KEY}`
    }
    material.needsUpdate = true

    return () => {
      material.onBeforeCompile = originalOnBeforeCompile
      material.customProgramCacheKey = originalCacheKey
      material.needsUpdate = true
    }
  }

  const applyShadowWobble = (mesh: Mesh, uniforms: WobbleUniforms) => {
    const previousDepth = mesh.customDepthMaterial
    const previousDistance = mesh.customDistanceMaterial

    const depthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking })
    depthMaterial.onBeforeCompile = (shader) =>
      patchWobbleShader(shader, uniforms, { withNormals: false })

    const distanceMaterial = new MeshDistanceMaterial()
    distanceMaterial.onBeforeCompile = (shader) =>
      patchWobbleShader(shader, uniforms, { withNormals: false })

    mesh.customDepthMaterial = depthMaterial
    mesh.customDistanceMaterial = distanceMaterial

    return () => {
      mesh.customDepthMaterial = previousDepth
      mesh.customDistanceMaterial = previousDistance
      depthMaterial.dispose()
      distanceMaterial.dispose()
    }
  }
</script>

<script lang="ts">
  import { isInstanceOf, useParent, useTask, useThrelte } from '@threlte/core'
  import type { WobbleProps } from './types.js'

  const { invalidate } = useThrelte()

  let {
    speed = 1,
    factor = 1,
    frequency = 1,
    noise = 0,
    pulse = 0,
    drift = 0,
    bendiness = 0,
    axis = [0, 1, 0],
    anchor,
    forceDirection,
    time,
    material: materialProp
  }: WobbleProps = $props()

  const parent = useParent()

  const uniforms: WobbleUniforms = {
    time: { value: 0 },
    factor: { value: 1 },
    frequency: { value: 1 },
    noise: { value: 0 },
    pulse: { value: 0 },
    drift: { value: 0 },
    bendiness: { value: 0 },
    axis: { value: new Vector3(0, 1, 0) },
    anchor: { value: 0 },
    hasAnchor: { value: false },
    forceDirection: { value: new Vector3() },
    hasForceDirection: { value: false }
  }

  $effect.pre(() => {
    uniforms.factor.value = factor
    invalidate()
  })

  $effect.pre(() => {
    uniforms.frequency.value = frequency
    invalidate()
  })

  $effect.pre(() => {
    uniforms.noise.value = noise
    invalidate()
  })

  $effect.pre(() => {
    uniforms.pulse.value = pulse
    invalidate()
  })

  $effect.pre(() => {
    uniforms.drift.value = drift
    invalidate()
  })

  $effect.pre(() => {
    uniforms.bendiness.value = bendiness
    invalidate()
  })

  $effect.pre(() => {
    uniforms.axis.value.set(axis[0], axis[1], axis[2])
    invalidate()
  })

  $effect.pre(() => {
    if (anchor === undefined) {
      uniforms.hasAnchor.value = false
    } else {
      uniforms.anchor.value = anchor
      uniforms.hasAnchor.value = true
    }
    invalidate()
  })

  $effect.pre(() => {
    if (forceDirection === undefined) {
      uniforms.hasForceDirection.value = false
    } else {
      uniforms.forceDirection.value.set(forceDirection[0], forceDirection[1], forceDirection[2])
      uniforms.hasForceDirection.value = true
    }
    invalidate()
  })

  // Drive the clock externally when `time` is supplied; otherwise the task
  // below advances it. We invalidate manually because the task that would
  // normally request a frame is paused when time is external.
  $effect.pre(() => {
    if (time !== undefined) {
      uniforms.time.value = time
      invalidate()
    }
  })

  $effect.pre(() => {
    const parentMesh = $parent
    if (!isInstanceOf(parentMesh, 'Mesh')) {
      console.error('<Wobble> must be placed inside a <T.Mesh>.')
      return
    }

    const target = materialProp ?? parentMesh.material
    if (!target) return

    const materials = Array.isArray(target) ? target : [target]
    const restoreMaterials = materials.map((m) => applyWobble(m, uniforms))
    const restoreShadow = applyShadowWobble(parentMesh as Mesh, uniforms)

    return () => {
      restoreMaterials.forEach((fn) => fn())
      restoreShadow()
    }
  })

  useTask(
    (delta) => {
      uniforms.time.value += delta * speed
    },
    { running: () => time === undefined && speed !== 0 }
  )
</script>
