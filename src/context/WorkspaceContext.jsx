import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { workspaceService } from '../services/modules/workspaceService.js'
import { useAuth } from './AuthContext.jsx'

const WorkspaceContext = createContext(null)

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([])
  const [activeWorkspace, setActiveWorkspace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      setWorkspaces([])
      setActiveWorkspace(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    workspaceService.list()
      .then((list) => {
        setWorkspaces(list)
        const active = list.find((w) => w.active) || list[0]
        setActiveWorkspace(active)
        if (active) localStorage.setItem('ss_active_workspace', active.id)
      })
      .catch((err) => {
        console.error('Failed to load workspaces:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [isAuthenticated])

  const switchWorkspace = useCallback(async (id) => {
    const ws = await workspaceService.switchTo(id)
    setActiveWorkspace(ws)
    setWorkspaces((prev) => prev.map((w) => ({ ...w, active: w.id === id })))
    return ws
  }, [])

  const addWorkspace = useCallback((ws) => {
    setWorkspaces((prev) => [...prev, ws])
  }, [])

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, activeWorkspace, isLoading, switchWorkspace, addWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
