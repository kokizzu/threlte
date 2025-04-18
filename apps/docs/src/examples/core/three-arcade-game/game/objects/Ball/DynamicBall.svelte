<script lang="ts">
  import {
    CoefficientCombineRule,
    type RigidBody as RapierRigidBody
  } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { AutoColliders, RigidBody } from '@threlte/rapier'
  import { arenaHeight, playerHeight, playerToBorderDistance } from '../../config'
  import { game } from '../../Game.svelte'
  import { ballGeometry, ballMaterial } from './common'
  import { onMount } from 'svelte'

  type Props = {
    startAtPosX: number
  }
  let { startAtPosX }: Props = $props()

  let posX = $state(0)
  let rigidBody: RapierRigidBody | undefined = $state()

  const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  const ballSpeed = $derived.by(() => {
    return map(game.levelIndex, 0, 9, 0.1, 0.3)
  })

  let ballIsSpawned = false
  const spawnBall = () => {
    if (!rigidBody) return
    ballIsSpawned = true
    const randomSign = Math.random() > 0.5 ? 1 : -1
    const randomX = (randomSign * Math.random() * ballSpeed) / 2
    rigidBody.applyImpulse({ x: randomX, y: 0, z: -ballSpeed }, true)
  }

  const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

  const onSensorEnter = () => {
    if (game.state === 'playing') {
      game.state = 'game-over'
    }
  }

  useTask(() => {
    if (!ballIsSpawned && rigidBody) {
      spawnBall()
      stop()
    }
    const rbTranslation = rigidBody?.translation()
    game.ballPosition = {
      x: rbTranslation?.x ?? 0,
      z: rbTranslation?.z ?? 0
    }
  })
  $effect(() => {
    if (rigidBody) game.ballRigidBody = rigidBody
  })
  onMount(() => {
    posX = startAtPosX
  })
</script>

<T.Group position={[posX, 0, startAtPosZ]}>
  <RigidBody
    bind:rigidBody
    type={'dynamic'}
    onsensorenter={onSensorEnter}
    enabledTranslations={[true, false, true]}
  >
    <AutoColliders
      shape="ball"
      mass={1}
      friction={0}
      restitution={1}
      restitutionCombineRule={CoefficientCombineRule.Max}
      frictionCombineRule={CoefficientCombineRule.Min}
    >
      <T.Mesh>
        <T is={ballGeometry} />
        <T is={ballMaterial} />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
