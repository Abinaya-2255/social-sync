import { ThemeProvider } from '../context/ThemeContext.jsx'
import { ToastProvider } from '../context/ToastContext.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { WorkspaceProvider } from '../context/WorkspaceContext.jsx'

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WorkspaceProvider>{children}</WorkspaceProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
