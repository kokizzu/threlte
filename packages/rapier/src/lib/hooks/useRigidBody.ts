import { getContext, setContext } from 'svelte'
import type { RigidBodyEvents, ThrelteRigidBody } from '../types/types.js'

export interface RigidBodyContext {
  current: ThrelteRigidBody | undefined
  events: RigidBodyEvents
}

const key = Symbol('threlte-rapier-rigidbody')

export const provideRigidbody = (
  rigidBody: () => ThrelteRigidBody,
  events: () => RigidBodyEvents
) => {
  const context: RigidBodyContext = {
    get current() {
      return rigidBody()
    },
    get events() {
      return events()
    }
  }

  setContext<RigidBodyContext>(key, context)
}

export const useRigidBody = (): RigidBodyContext => {
  const context = getContext<RigidBodyContext>(key)

  return context ?? { current: undefined, events: {} }
}

// Will be removed in Threlte 9

export const useRigidBody_deprecated = () => {
  const context = getContext<RigidBodyContext>(key)

  return context?.current
}
