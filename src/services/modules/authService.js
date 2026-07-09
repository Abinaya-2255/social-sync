import { supabase } from '../../lib/supabaseClient.js'

export const mapSupabaseUser = (sbUser) => {
  if (!sbUser) return null
  return {
    id: sbUser.id,
    email: sbUser.email,
    name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'User',
    avatar: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.avatar || null,
    role: sbUser.user_metadata?.role || 'Owner',
    company: sbUser.user_metadata?.company || 'Reyes Creative Studio',
    timezone: sbUser.user_metadata?.timezone || 'America/New_York',
    language: sbUser.user_metadata?.language || 'English (US)',
  }
}

export const authService = {
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return { user: mapSupabaseUser(data.user), session: data.session }
  },

  async signup({ name, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })
    if (error) throw error
    return { user: mapSupabaseUser(data.user), session: data.session }
  },

  async forgotPassword({ email }) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/app/dashboard`
    })
    if (error) throw error
    return { success: true }
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) return null
    return { user: mapSupabaseUser(session.user), session }
  },

  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app/dashboard`
      }
    })
    if (error) throw error
  }
}
