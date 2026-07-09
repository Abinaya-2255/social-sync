import { supabase } from '../../lib/supabaseClient.js'
import { mapSupabaseUser } from './authService.js'

export const userService = {
  async getProfile() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return mapSupabaseUser(user)
  },

  async updateProfile(payload) {
    const { data: { user }, error } = await supabase.auth.updateUser({
      data: {
        full_name: payload.name,
        company: payload.company,
        timezone: payload.timezone,
      }
    })
    if (error) throw error
    return mapSupabaseUser(user)
  },

  async changePassword({ password }) {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    return { success: true }
  },
}
