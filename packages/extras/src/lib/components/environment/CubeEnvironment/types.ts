import type { CommonEnvironmentProps } from '../types.js'

export type CubeEnvironmentProps = CommonEnvironmentProps & {
  /**
   * The files to load or the textures to use
   */
  urls?: [
    positiveX: string,
    negativeX: string,
    positiveY: string,
    negativeY: string,
    positiveZ: string,
    negativeZ: string
  ]
}
