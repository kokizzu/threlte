<script
  module
  lang="ts"
>
  import {
    Mesh,
    MeshDepthMaterial,
    MeshDistanceMaterial,
    RGBADepthPacking,
    Vector2,
    Vector3,
    type Material,
    type WebGLProgramParametersWithUniforms
  } from 'three'

  type WobbleUniforms = {
    time: { value: number }
    factor: { value: number }
    randomness: { value: number }
    bendiness: { value: number }
    anchor: { value: Vector3 }
    hasAnchor: { value: boolean }
    forceDirection: { value: Vector2 }
    hasForceDirection: { value: boolean }
  }

  // Ashima 3D simplex noise. Inlined so users don't need to wire up a noise
  // chunk themselves. Bounded roughly to [-1, 1], smooth, and aperiodic in
  // any direction — perfect for nudging the wobble out of lockstep.
  const SIMPLEX_NOISE_GLSL = `
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
    // frequencies and halving amplitudes. Produces a slow base oscillation
    // with progressively finer flutter on top — the standard recipe for
    // organic, wind-like motion (procedural terrain, GPU Gems trees, etc.).
    // Normalized so the result stays roughly in [-1, 1].
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
  `

  const WOBBLE_CACHE_KEY = '__wobble_v1'

  const patchWobbleShader = (
    shader: WebGLProgramParametersWithUniforms,
    uniforms: WobbleUniforms,
    { withNormals }: { withNormals: boolean }
  ) => {
    shader.uniforms.time = uniforms.time
    shader.uniforms.factor = uniforms.factor
    shader.uniforms.randomness = uniforms.randomness
    shader.uniforms.bendiness = uniforms.bendiness
    shader.uniforms.anchor = uniforms.anchor
    shader.uniforms.hasAnchor = uniforms.hasAnchor
    shader.uniforms.forceDirection = uniforms.forceDirection
    shader.uniforms.hasForceDirection = uniforms.hasForceDirection

    shader.vertexShader = `
      uniform float time;
      uniform float factor;
      uniform float randomness;
      uniform float bendiness;
      uniform vec3 anchor;
      uniform bool hasAnchor;
      uniform vec2 forceDirection;
      uniform bool hasForceDirection;
      ${SIMPLEX_NOISE_GLSL}
      ${shader.vertexShader}
    `

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `float weight = hasAnchor ? abs(position.y - anchor.y) : 1.0;
       // For InstancedMesh / BatchedMesh, fold each instance's world XZ
       // into the noise sample so different instances wobble out of phase.
       // The matrices are already defined by three's batching/instancing
       // chunks earlier in main(); the #ifdef guards keep us safe on
       // non-instanced meshes where these symbols don't exist.
       vec2 instanceOffset = vec2(0.0);
       #ifdef USE_INSTANCING
         instanceOffset = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
       #endif
       #ifdef USE_BATCHING
         instanceOffset = vec2(batchingMatrix[3].x, batchingMatrix[3].z);
       #endif

       float sineWobble = sin(1.0 + time + position.y + instanceOffset.x);
       // Domain warping: sample fBM once to perturb the input of a second fBM
       // call. Breaks up the grid-aligned feel of straight noise and gives
       // fluid, swirling motion (iquilezles's classic trick).
       vec3 noiseInput = vec3((position.xz + instanceOffset) * 0.6, time * 0.5);
       float warpScale = 0.5;
       vec3 warpedInput = noiseInput + warpScale * vec3(
         wobbleFbm(noiseInput),
         wobbleFbm(noiseInput + vec3(5.2, 1.3, 0.0)),
         wobbleFbm(noiseInput + vec3(0.0, 2.1, 4.6))
       );
       float noiseWobble = wobbleFbm(warpedInput);
       float wobble = mix(sineWobble, noiseWobble, randomness);
       // Slow time-only fBM modulates magnitude — produces wind-like gusts
       // and lulls. Instance offset feeds in so neighbouring blades catch
       // gusts at slightly different times.
       float gustNoise = wobbleFbm(vec3(time * 0.3 + instanceOffset.x * 0.3, 0.0, instanceOffset.y * 0.3)) * 0.5 + 0.5;
       float gust = mix(1.0, 0.1 + 1.4 * gustNoise, randomness);
       float theta = wobble * gust / 2.0 * factor * weight;

       // Y-axis twist (existing motion).
       float c = cos(theta);
       float s = sin(theta);
       mat3 twistMatrix = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
       vec3 twisted = vec3(position) * twistMatrix;
       ${withNormals ? 'vec3 twistedNormal = vNormal * twistMatrix;' : ''}

       // Directional bend. Pivots about the anchor (or origin) so vertices
       // farther from the pivot displace more — like a stem hinged at the
       // soil. Force heading is either user-supplied or drifts via fBM so
       // unset = wind-like behavior. Bend uses its own slow oscillation —
       // macroscopic sway is much slower than the per-vertex twist flutter.
       vec3 anchorPoint = hasAnchor ? anchor : vec3(0.0);
       vec3 forceDir;
       if (hasForceDirection) {
         vec2 fd = forceDirection;
         float fdLen = length(fd);
         forceDir = fdLen > 0.0001 ? vec3(fd.x / fdLen, 0.0, fd.y / fdLen) : vec3(1.0, 0.0, 0.0);
       } else {
         // Default to +X with slow drift scaled by randomness, so randomness=0
         // gives a steady direction (no rotating-around feel) and randomness=1
         // sweeps the full circle over time.
         float windAngle = wobbleFbm(vec3(time * 0.08, 0.0, 0.0)) * 3.14159 * randomness;
         forceDir = vec3(cos(windAngle), 0.0, sin(windAngle));
       }
       vec3 bendAxis = cross(vec3(0.0, 1.0, 0.0), forceDir);
       // Bend is a slow macroscopic sway. The angle scales with distance
       // from the anchor along Y, so the mesh bends in a beam-like curve
       // (tip flexes more than the base) rather than rotating as a rigid
       // body. At randomness=0 it's a uniform time-only oscillation; higher
       // randomness mixes in slow per-vertex noise for organic micro-gusts.
       float bendUniform = sin(time * 0.25 + instanceOffset.x * 0.2);
       float bendPerVertex = wobbleFbm(vec3((position.xz + instanceOffset) * 0.3, time * 0.15));
       float bendWobble = mix(bendUniform, bendPerVertex, randomness);
       float bendTheta = bendWobble * gust * factor * weight / 2.0;
       float cb = cos(bendTheta);
       float sb = sin(bendTheta);
       vec3 fromAnchor = position - anchorPoint;
       // Rodrigues rotation of fromAnchor about bendAxis by bendTheta.
       vec3 bentLocal =
         fromAnchor * cb +
         cross(bendAxis, fromAnchor) * sb +
         bendAxis * dot(bendAxis, fromAnchor) * (1.0 - cb);
       vec3 bent = bentLocal + anchorPoint;

       vec3 transformed = mix(twisted, bent, bendiness);
       ${
         withNormals
           ? `vec3 bentNormal =
              vNormal * cb +
              cross(bendAxis, vNormal) * sb +
              bendAxis * dot(bendAxis, vNormal) * (1.0 - cb);
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
  import { isInstanceOf, useParent, useTask } from '@threlte/core'
  import type { WobbleProps } from './types.js'

  let {
    speed = 1,
    factor = 1,
    randomness = 0,
    bendiness = 0,
    anchor,
    forceDirection,
    material: materialProp
  }: WobbleProps = $props()

  const parent = useParent()

  const uniforms: WobbleUniforms = {
    time: { value: 0 },
    factor: { value: 1 },
    randomness: { value: 0 },
    bendiness: { value: 0 },
    anchor: { value: new Vector3() },
    hasAnchor: { value: false },
    forceDirection: { value: new Vector2() },
    hasForceDirection: { value: false }
  }

  $effect.pre(() => {
    uniforms.factor.value = factor
  })

  $effect.pre(() => {
    uniforms.randomness.value = randomness
  })

  $effect.pre(() => {
    uniforms.bendiness.value = bendiness
  })

  $effect.pre(() => {
    if (anchor === undefined) {
      uniforms.hasAnchor.value = false
    } else {
      uniforms.anchor.value.set(anchor[0], anchor[1], anchor[2])
      uniforms.hasAnchor.value = true
    }
  })

  $effect.pre(() => {
    if (forceDirection === undefined) {
      uniforms.hasForceDirection.value = false
    } else {
      uniforms.forceDirection.value.set(forceDirection[0], forceDirection[1])
      uniforms.hasForceDirection.value = true
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
    { running: () => speed !== 0 }
  )
</script>
