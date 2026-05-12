import type { Material, Vector2Tuple, Vector3Tuple } from 'three'

export type WobbleProps = {
  /**
   * How fast the wobble animation advances.
   * @default 1
   */
  speed?: number

  /**
   * How strongly vertices are displaced.
   * @default 1
   */
  factor?: number

  /**
   * Blends from a clean sine wobble (0) to a noise-driven wobble (1). At
   * higher values different parts of the mesh fall out of phase AND the
   * overall magnitude is modulated by a slow time-only noise — producing
   * wind-like gusts and lulls. Useful when the default uniform sway feels
   * too mechanical.
   * @default 0
   */
  randomness?: number

  /**
   * A point in local geometry space that stays still while the rest of the
   * mesh wobbles. Wobble amplitude scales with each vertex's distance along
   * Y from this point. Useful for keeping the base of an object planted —
   * for example, a plant at the soil line. When omitted, every vertex
   * wobbles equally. Only the Y component is currently used.
   */
  anchor?: Vector3Tuple

  /**
   * Blends from a Y-axis twist (0) to a directional bend pivoted at the
   * anchor (1). A twist spins each slice of the mesh about Y; a bend tilts
   * the mesh in the direction of an external force, like a plant leaning in
   * the wind.
   * @default 0
   */
  bendiness?: number

  /**
   * Horizontal direction the bend leans toward, as `[x, z]`. When omitted,
   * a slowly drifting direction is generated from noise — useful for wind-
   * like behavior. Set this when the force has a known heading, e.g. an
   * explosion, a fan, or an avatar walking past.
   */
  forceDirection?: Vector2Tuple

  /**
   * The material to wobble. When omitted, the parent mesh's `material`
   * (read once at mount) is used. Pass a bound material ref to react to
   * runtime material swaps.
   */
  material?: Material | Material[]
}
