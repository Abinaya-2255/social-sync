export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const isNotEmpty = (value) => typeof value === 'string' && value.trim().length > 0

export const minLength = (value, len) => typeof value === 'string' && value.trim().length >= len

export const passwordsMatch = (a, b) => a === b && a.length > 0

export function validateLoginForm({ email, password }) {
  const errors = {}
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!isNotEmpty(password)) errors.password = 'Password is required'
  return errors
}

export function validateSignupForm({ name, email, password, confirmPassword }) {
  const errors = {}
  if (!isNotEmpty(name)) errors.name = 'Full name is required'
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!minLength(password, 8)) errors.password = 'Password must be at least 8 characters'
  if (!passwordsMatch(password, confirmPassword)) errors.confirmPassword = 'Passwords do not match'
  return errors
}
