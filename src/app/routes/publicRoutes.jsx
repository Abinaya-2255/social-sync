import { lazy } from 'react'
import PublicLayout from '../../layouts/PublicLayout.jsx'

const LandingPage = lazy(() => import('../../pages/public/LandingPage.jsx'))
const FeaturesPage = lazy(() => import('../../pages/public/FeaturesPage.jsx'))
const PricingPage = lazy(() => import('../../pages/public/PricingPage.jsx'))
const AboutPage = lazy(() => import('../../pages/public/AboutPage.jsx'))
const ContactPage = lazy(() => import('../../pages/public/ContactPage.jsx'))
const FAQPage = lazy(() => import('../../pages/public/FAQPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('../../pages/public/PrivacyPolicyPage.jsx'))
const TermsPage = lazy(() => import('../../pages/public/TermsPage.jsx'))

export const publicRoutes = {
  path: '/',
  element: <PublicLayout />,
  children: [
    { index: true, element: <LandingPage /> },
    { path: 'features', element: <FeaturesPage /> },
    { path: 'pricing', element: <PricingPage /> },
    { path: 'about', element: <AboutPage /> },
    { path: 'contact', element: <ContactPage /> },
    { path: 'faq', element: <FAQPage /> },
    { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
    { path: 'terms', element: <TermsPage /> },
  ],
}
