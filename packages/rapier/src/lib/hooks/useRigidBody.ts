import { getContext, setContext } from 'svelte'
import type { ThrelteRigidBody } from '../types/types.js'

export type RigidBodyContext = ThrelteRigidBody & { current: ThrelteRigidBody | undefined }

const key = Symbol('threlte-rapier-rigidbody')

export const provideRigidbody = (rigidBody: () => ThrelteRigidBody) => {
  const rb = rigidBody()

  Object.defineProperty(rb, 'current', {
    get() {
      return rigidBody()
    }
  })

  setContext(key, rb)
}

export const useRigidBody = (): RigidBodyContext => {
  const context = getContext<RigidBodyContext>(key)

  return context ?? { current: undefined }
}
