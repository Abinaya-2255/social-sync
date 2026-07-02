import axios from 'axios'

// Single Axios instance for the whole app. Real backend integration
// only ever touches this file + interceptors.js — feature code never
// imports axios directly.
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false'
