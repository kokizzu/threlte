// Tiny shared dispatcher: Launcher calls `spawn(...)`, anything else calls
// `despawn(id)`. Balls.svelte assigns the implementations on mount. The
// functions are referenced through this object (not destructured) so that
// the indirection stays stable across re-renders.
export const spawnQueue: {
  spawn: (x: number, y: number, vx: number, vy: number) => void
  despawn: (id: number) => void
} = {
  spawn: () => {},
  despawn: () => {}
}
