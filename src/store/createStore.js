import { useEffect, useState } from 'react'

// Minimal external-store implementation so cross-page state (post drafts,
// UI flags) can persist across route changes without prop drilling,
// without adding a new dependency beyond the approved stack.
export function createStore(initialState) {
  let state = initialState
  const listeners = new Set()

  const getState = () => state
  const setState = (partial) => {
    state = typeof partial === 'function' ? { ...state, ...partial(state) } : { ...state, ...partial }
    listeners.forEach((l) => l())
  }
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function useStore(selector = (s) => s) {
    const [selected, setSelected] = useState(() => selector(state))
    useEffect(() => {
      const unsub = subscribe(() => setSelected(selector(state)))
      return unsub
    }, [selector])
    return selected
  }

  return { getState, setState, subscribe, useStore }
}
