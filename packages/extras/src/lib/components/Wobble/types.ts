import type { Material, Vector3Tuple } from 'three'

export type WobbleProps = {
  /**
   * How fast the internal animation clock advances. Ignored when `time` is
   * provided as a prop.
   * @default 1
   */
  speed?: number

  /**
   * How strongly vertices are displaced. Roughly the maximum rotation angle
   * (in radians) at full weight.
   * @default 1
   */
  factor?: number

  /**
   * Multiplier on the spatial scale of the per-vertex noise sampling and
   * the sine phase. Increase for tighter / shorter-wavelength wobbles
   * (useful on large geometry); decrease for broader sway on small models.
   * @default 1
   */
  frequency?: number

  /**
   * Per-vertex noise blend. 0 keeps every vertex in lockstep on a clean
   * sine; 1 samples each vertex from a 3D simplex/fBM field so neighbours
   * fall out of phase.
   * @default 0
   */
  noise?: number

  /**
   * Slow time-only amplitude modulation. 0 keeps the wobble amplitude
   * steady; 1 lets it swell and fade over time. Sampled with no spatial
   * coords, so the whole mesh pulses together.
   * @default 0
   */
  pulse?: number

  /**
   * Direction drift for bend. 0 holds the bend direction steady; 1 lets it
   * wander around the full circle via a slow time-only noise. Only matters
   * when `bendiness > 0` and `forceDirection` is not provided.
   * @default 0
   */
  drift?: number

  /**
   * Blends from an axial twist (0) to a directional bend pivoted at the
   * anchor (1). A twist spins each slice of the mesh around the axis; a
   * bend tilts the mesh in the direction of the force, like a plant leaning
   * in the wind.
   * @default 0
   */
  bendiness?: number

  /**
   * The "up" direction of the wobble, in local geometry space. Twist
   * happens around this axis; bend tilts perpendicular to it. Default is
   * `[0, 1, 0]` (Y-up) — change it for sideways objects (a vine, a flag
   * pole laid horizontally, a model exported Z-up).
   * @default [0, 1, 0]
   */
  axis?: Vector3Tuple

  /**
   * Position along `axis` where the mesh stays anchored. Wobble amplitude
   * scales with each vertex's distance from this anchor plane, so vertices
   * on the plane don't move and the rest sway around them. Useful for
   * pinning a plant base or a flag pole. When omitted, every vertex
   * wobbles equally.
   */
  anchor?: number

  /**
   * Direction the bend leans toward, in local geometry space. The component
   * along `axis` is projected out, so only the perpendicular component
   * matters. When omitted, a slowly drifting direction is generated from
   * noise — the wind-like default. Set this when the force has a known
   * heading, e.g. an explosion, a fan, an avatar walking past.
   */
  forceDirection?: Vector3Tuple

  /**
   * Drive the animation clock externally. When provided, `speed` is ignored
   * and the internal task is paused — useful for syncing wobble to a
   * global timeline, scrubbing, or sharing time across instances.
   */
  time?: number

  /**
   * The material to wobble. When omitted, the parent mesh's `material`
   * (read once at mount) is used. Pass a bound material ref to react to
   * runtime material swaps.
   */
  material?: Material | Material[]
}
