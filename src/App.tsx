import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageMeta } from './components/PageMeta'
import { HomePage } from './pages/HomePage'
import { ApartmentDetailPage } from './pages/ApartmentDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <PageMeta />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mieszkania/:slug" element={<ApartmentDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
