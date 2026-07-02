import { lazy } from 'react'
import AuthLayout from '../../layouts/AuthLayout.jsx'

const LoginPage = lazy(() => import('../../pages/auth/LoginPage.jsx'))
const SignupPage = lazy(() => import('../../pages/auth/SignupPage.jsx'))
const ForgotPasswordPage = lazy(() => import('../../pages/auth/ForgotPasswordPage.jsx'))

export const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <LoginPage /> },
    { path: 'signup', element: <SignupPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
  ],
}
