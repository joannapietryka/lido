import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageMeta } from './components/PageMeta'
import { HashNavHandler } from './components/HashNavHandler'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { ApartmentDetailPage } from './pages/ApartmentDetailPage'
import { RuczajPage } from './pages/RuczajPage'

export default function App() {
  return (
    <BrowserRouter>
      <PageMeta />
      <ScrollToTop />
      <HashNavHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mieszkania" element={<Navigate to="/mieszkania/2-pokoje" replace />} />
        <Route path="/mieszkania/:slug" element={<ApartmentDetailPage />} />
        <Route path="/ruczaj" element={<RuczajPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
