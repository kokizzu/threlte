import { EventDispatcher } from 'three'
import { useScheduler } from '../../../context/fragments/scheduler.svelte.js'
import { resolvePropertyPath } from '../../../utilities/resolvePropertyPath.js'
import { untrack } from 'svelte'

const ignoredProps = new Set(['$$scope', '$$slots', 'type', 'args', 'attach', 'instance'])

/**
 * Only scalar values are memoized. Objects/functions/arrays are treated as dynamic
 * so Svelte-style reactivity remains intuitive.
 */
const memoizeProp = (value: unknown): boolean => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

const setter = (target: any, key: any, value: any) => {
  const current = target[key]
  const valueIsArray = Array.isArray(value)

  if (
    !valueIsArray &&
    typeof value === 'number' &&
    typeof current === 'object' &&
    current !== null &&
    typeof current.setScalar === 'function' &&
    // Colors have setScalar, but the hex notation (e.g. 0xff0000) is popular
    // and matches the number type, so route colors through .set() instead.
    !current.isColor
  ) {
    current.setScalar(value)
  } else if (typeof current === 'object' && current !== null && typeof current.set === 'function') {
    if (valueIsArray) current.set(...value)
    else current.set(value)
  } else {
    target[key] = value
  }
}

export const useProps = <Type>(
  object: () => Type,
  props: () => Record<string, unknown>,
  pluginProps: () => string[] | undefined
) => {
  const { invalidate } = useScheduler()

  /**
   * Skip redundant scalar assignments for the same instance + path.
   */
  const memoizedProps = new Map<
    string,
    {
      instance: any
      value: any
    }
  >()

  const setProp = <T>(instance: T, propertyPath: string, value: any) => {
    if (memoizeProp(value)) {
      const memoizedProp = memoizedProps.get(propertyPath)
      if (memoizedProp && memoizedProp.instance === instance && memoizedProp.value === value) {
        return
      }
      memoizedProps.set(propertyPath, {
        instance,
        value
      })
    } else {
      /**
       * Clear scalar memo entry when this path receives a non-scalar, so if it later
       * becomes scalar again we don't carry stale assumptions.
       */
      memoizedProps.delete(propertyPath)
    }

    const { key, target } = resolvePropertyPath(instance, propertyPath)

    /**
     * If we can determine that this is an event listener prop,
     * attach it.
     */
    if (
      typeof value === 'function' &&
      key.startsWith('on') &&
      !propertyPath.includes('.') &&
      'addEventListener' in (target as EventDispatcher)
    ) {
      const dispatcher = target as EventDispatcher<Record<string, any>>
      const eventName = key.slice(2)

      dispatcher.addEventListener(eventName, value)

      return () => {
        dispatcher.removeEventListener?.(eventName, value)
      }
    }

    if (value !== undefined && value !== null) {
      setter(target, key, value)
    } else {
      target[key] = value
    }

    invalidate()
    return
  }

  $effect.pre(() => {
    const _object = object()
    const _props = props()
    const _pluginProps = pluginProps()

    // Clear memoized props when the instance or props reference changes,
    // preventing unbounded growth from previous instances.
    memoizedProps.clear()

    untrack(() => {
      for (const key in _props) {
        $effect.pre(() => {
          if (_pluginProps?.includes(key) || ignoredProps.has(key)) {
            return
          }

          return setProp(_object, key, _props[key])
        })
      }
    })
  })
}
