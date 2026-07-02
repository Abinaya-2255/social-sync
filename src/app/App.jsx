import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppProviders from './AppProviders.jsx'
import { publicRoutes } from './routes/publicRoutes.jsx'
import { authRoutes } from './routes/authRoutes.jsx'
import { appRoutes } from './routes/appRoutes.jsx'
import NotFoundPage from '../pages/public/NotFoundPage.jsx'
import Loader from '../components/ui/Loader.jsx'
import '../services/api/interceptors.js'

/* Page-level suspense fallback — shown while lazy chunks are loading */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <Loader size={32} label="Loading..." />
    </div>
  )
}

import ErrorPage from '../pages/public/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage type="500" />,
    children: [
      publicRoutes,
      authRoutes,
      appRoutes,
      { path: '*', element: <NotFoundPage /> },
    ]
  }
])

export default function App() {
  return (
    <AppProviders>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  )
}
