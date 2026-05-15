<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import Ball from './Ball.svelte'
  import { spawnQueue } from './spawnQueue.svelte'

  // Store the per-ball tuples on the instance so the array references stay
  // stable across renders. Each spawn re-runs this {#each}, and any existing
  // Ball that sees a new array literal as a prop would have its launch-time
  // $effects (setLinvel, mesh position) rerun against fresh references.
  type BallInstance = {
    id: number
    position: [number, number, number]
    linearVelocity: [number, number, number]
  }

  const balls = new SvelteSet<BallInstance>()
  let nextId = 0

  spawnQueue.spawn = (x, y, vx, vy) => {
    balls.add({ id: nextId++, position: [x, y, 0], linearVelocity: [vx, vy, 0] })
  }

  spawnQueue.despawn = (id) => {
    for (const b of balls) {
      if (b.id === id) {
        balls.delete(b)
        return
      }
    }
  }
</script>

{#each balls as ball (ball.id)}
  <Ball
    id={ball.id}
    position={ball.position}
    linearVelocity={ball.linearVelocity}
  />
{/each}
