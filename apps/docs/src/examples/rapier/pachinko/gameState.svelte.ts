export const FIELD_WIDTH = 6
export const FIELD_HEIGHT = 10
export const CHANNEL_X = FIELD_WIDTH / 2 - 0.32

// Channel geometry — shared with the Frame component (which builds the inner
// wall) and the Launcher (whose sensor must span the channel's full inside
// height so a stray ball anywhere up the channel still blocks new spawns).
export const CHANNEL_TOP_Y = FIELD_HEIGHT / 2 - 2.2
export const CHANNEL_BOTTOM_Y = -FIELD_HEIGHT / 2 + 0.1

// Arcade cabinet dimensions — the cabinet wraps the playfield with a top crown,
// side rails, and a tilted control panel below where the HUD lives.
export const SIDE_RAIL_WIDTH = 0.5
export const CABINET_WIDTH = FIELD_WIDTH + SIDE_RAIL_WIDTH * 2
export const CROWN_HEIGHT = 1.0
export const CROWN_Y = FIELD_HEIGHT / 2 + CROWN_HEIGHT / 2
export const CONTROL_PANEL_HEIGHT = 2.4
export const CONTROL_PANEL_Y = -FIELD_HEIGHT / 2
export const CONTROL_PANEL_TILT = -Math.PI / 7 // ~-25°, top edge stays at the field, panel angles forward

// Bar half-length 0.45 + bar half-thickness 0.035 + ball radius 0.14 + a touch
// of breathing room → ~0.65. Pegs whose centre falls inside this radius around
// a windmill hub are skipped.
export const WINDMILL_CLEARANCE = 0.65

// Windmill placements. Shared with Pegs so it can clear the spin radius —
// otherwise the bar collides with adjacent pegs and gets locked in place.
export const windmills: { position: [number, number, number]; spin: number }[] = [
  { position: [-1.55, 1.3, 0], spin: 0.6 },
  { position: [1.2, 1.3, 0], spin: -0.6 },
  { position: [-0.2, 0.3, 0], spin: 0 },
  { position: [-1.55, -1.7, 0], spin: -0.4 },
  { position: [1.2, -1.7, 0], spin: 0.4 }
]

export const gameState = $state({
  holding: false,
  charge: 0,
  autoFiring: false,
  score: 0,
  lastPocketHit: '' as '' | 'low' | 'mid' | 'high' | 'jackpot'
})

// Ball collider handle -> despawn callback. Pockets look up by handle when a
// ball trips the sensor; the ball registers/unregisters on mount/unmount. The
// launch-zone sensor also consults it to ignore the plunger.
export const ballRegistry = new Map<number, () => void>()
