import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authService } from '../services/modules/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authService
      .getSession()
      .then((session) => session && setUser(session.user))
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (credentials) => {
    const { user: loggedInUser } = await authService.login(credentials)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  const signup = useCallback(async (payload) => {
    const { user: newUser } = await authService.signup(payload)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
