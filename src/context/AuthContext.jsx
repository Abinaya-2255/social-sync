import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authService, mapSupabaseUser } from '../services/modules/authService.js'
import { supabase } from '../lib/supabaseClient.js'

// Evaluate hash synchronously at module load time before Supabase Client initialization strips it
const hasHash = typeof window !== 'undefined' && (
  window.location.hash.includes('access_token') ||
  window.location.hash.includes('id_token') ||
  window.location.hash.includes('refresh_token') ||
  window.location.search.includes('code=')
)

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // If we detect an OAuth redirect callback, keep isLoading = true
    if (hasHash) {
      setIsLoading(true)
    }

    // 1. Check initial session
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) console.error('[AuthContext] Error fetching initial session:', error)
        if (isMounted) {
          if (session) {
            setUser(mapSupabaseUser(session.user))
            localStorage.setItem('ss_token', session.access_token)
          }
          // Only turn off loading if we are NOT in an OAuth callback flow.
          // In an OAuth flow, we wait for onAuthStateChange to deliver the SIGNED_IN event.
          if (!hasHash) {
            setIsLoading(false)
          }
        }
      })
      .catch((err) => {
        console.error('[AuthContext] Catch in initial session check:', err)
        if (isMounted && !hasHash) {
          setIsLoading(false)
        }
      })

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return

      // Eagerly ignore initial null state if we are in the middle of OAuth parsing
      if (event === 'INITIAL_SESSION' && !session && hasHash) {
        return
      }

      const mappedUser = mapSupabaseUser(session?.user ?? null)
      setUser(mappedUser)

      // Synchronize with axiosClient's localStorage token tracker
      if (session?.access_token) {
        localStorage.setItem('ss_token', session.access_token)
      } else {
        localStorage.removeItem('ss_token')
      }

      // Turn off loading when the state resolves
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setIsLoading(false)
      } else if (event === 'INITIAL_SESSION') {
        // If we are in an OAuth callback, wait for SIGNED_IN event.
        if (!hasHash || session) {
          setIsLoading(false)
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoading(false)
      }

      // Cleanup hash tokens from URL bar immediately to avoid loops or browser history clutter
      if (session && (window.location.hash.includes('access_token') || window.location.hash.includes('id_token') || window.location.hash.includes('refresh_token'))) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    })

    // Fallback safety timeout: if OAuth resolution hangs, force stop loading after 4 seconds
    let timeoutId
    if (hasHash) {
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      }, 4000)
    }

    return () => {
      isMounted = false
      subscription.unsubscribe()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    return await authService.login(credentials)
  }, [])

  const signup = useCallback(async (payload) => {
    return await authService.signup(payload)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const loginWithGoogle = useCallback(async () => {
    await authService.signInWithGoogle()
  }, [])

  const isAuthenticated = !!user
  console.log("AUTH USER", user)
  console.log("AUTH", isAuthenticated)
  console.log("LOADING", isLoading)

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        loginWithGoogle,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
