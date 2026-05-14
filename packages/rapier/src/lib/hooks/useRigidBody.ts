import { getContext, setContext } from 'svelte'
import type { ThrelteRigidBody } from '../types/types.js'

export type RigidBodyContext = ThrelteRigidBody & { current: ThrelteRigidBody | undefined }

const key = Symbol('threlte-rapier-rigidbody')

export const provideRigidbody = (rigidBody: () => ThrelteRigidBody) => {
  setContext(
    key,
    Object.assign(rigidBody(), {
      get current() {
        return rigidBody()
      }
    })
  )
}

export const useRigidBody = (): RigidBodyContext => {
  const context = getContext<RigidBodyContext>(key)

  return context ?? { current: undefined }
}
