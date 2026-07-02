import { createStore } from './createStore.js'

const initialDraft = {
  caption: '',
  platforms: [],
  media: null,
  scheduledDate: null,
  scheduledTime: null,
}

const draftStore = createStore({ draft: initialDraft })

export const usePostDraftStore = (selector) => draftStore.useStore(selector)
export const draftActions = {
  updateDraft: (partial) =>
    draftStore.setState((s) => ({ draft: { ...s.draft, ...partial } })),
  resetDraft: () => draftStore.setState({ draft: initialDraft }),
}
