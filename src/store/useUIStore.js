import { createStore } from './createStore.js'

const uiStore = createStore({
  sidebarCollapsed: false,
  activeModal: null,
})

export const useUIStore = (selector) => uiStore.useStore(selector)
export const uiActions = {
  toggleSidebar: () => uiStore.setState((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (val) => uiStore.setState({ sidebarCollapsed: val }),
  openModal: (name) => uiStore.setState({ activeModal: name }),
  closeModal: () => uiStore.setState({ activeModal: null }),
}
