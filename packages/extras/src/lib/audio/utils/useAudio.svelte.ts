import { useLoader } from '@threlte/core'
import { AudioLoader, type Audio, type PositionalAudio } from 'three'

type AudioSource = string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream

export interface AudioProps {
  src: AudioSource
  autoplay?: boolean
  loop?: boolean
  volume?: number
  playbackRate?: number
  detune?: number
  onload?: (buffer: AudioBuffer | null) => void
  onerror?: (event: ErrorEvent) => void
  onprogress?: (event: ProgressEvent) => void
}

/**
 * This hook handles basic audio functionality.
 * It’s used by the <Audio> and <PositionalAudio> components.
 */
export const useAudio = <T extends Audio<GainNode> | PositionalAudio>(
  audio: () => T | undefined,
  src: () => AudioSource,
  autoplay: () => boolean,
  loop: () => boolean,
  volume: () => number,
  playbackRate: () => number,
  detune: () => number,
  props: () => {
    onload?: (buffer: AudioBuffer | null) => void
    onerror?: (event: ErrorEvent) => void
    onprogress?: (event: ProgressEvent) => void
  }
) => {
  let loaded = $state(false)
  let shouldPlay = $state(false)

  $effect(() => {
    audio()?.setVolume(volume())
  })

  $effect(() => {
    audio()?.setPlaybackRate(playbackRate())
  })

  $effect(() => {
    const currentAudio = audio()
    if (currentAudio?.source && currentAudio.detune) {
      currentAudio.setDetune(detune())
    }
  })

  $effect(() => {
    audio()?.setLoop(loop())
  })

  $effect(() => {
    if (!loaded) {
      if (audio()?.isPlaying) stop()
      return
    }

    if (autoplay() || shouldPlay) {
      play()
    }
  })

  $effect(() => {
    setSrc(src())
  })

  let audioDestroyed = false

  const loader = useLoader(AudioLoader)

  const setSrc = async (source: AudioProps['src']) => {
    loaded = false

    const currentAudio = audio()

    if (!currentAudio) return

    const { onload, onprogress, onerror } = props()

    try {
      if (typeof source === 'string') {
        const audioBuffer = await loader.load(source, {
          onProgress(event) {
            onprogress?.(event)
          }
        })
        currentAudio.setBuffer(audioBuffer)
      } else if (source instanceof AudioBuffer) {
        currentAudio.setBuffer(source)
      } else if (source instanceof HTMLMediaElement) {
        currentAudio.setMediaElementSource(source)
      } else if (source instanceof AudioBufferSourceNode) {
        currentAudio.setNodeSource(source)
      } else if (source instanceof MediaStream) {
        currentAudio.setMediaStreamSource(source)
      }
      loaded = true

      onload?.(currentAudio.buffer)
    } catch (error) {
      onerror?.(error as ErrorEvent)
    }
  }

  const play = async (delay?: number) => {
    // source is not loaded yet, so we should play it after it's loaded
    if (!loaded) {
      shouldPlay = true
      return
    }

    const currentAudio = audio()

    if (!currentAudio) return

    if (currentAudio.context.state !== 'running') {
      await currentAudio.context.resume()
      if (audioDestroyed) {
        return
      }
    }

    return currentAudio.play(delay)
  }

  const pause = () => {
    return audio()?.pause()
  }

  const stop = () => {
    const currentAudio = audio()

    if (!currentAudio) return

    if (!currentAudio.source) {
      return currentAudio
    }

    return currentAudio.stop()
  }

  $effect(() => {
    return () => {
      try {
        audioDestroyed = true
        stop()
      } catch (error) {
        console.warn('Error while destroying audio', error)
      }
    }
  })

  return {
    play,
    pause,
    stop
  }
}
