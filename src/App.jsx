import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Ventures from './pages/Ventures'
import VisaPath from './pages/VisaPath'
import University from './pages/University'
import Savings from './pages/Savings'
import Deadlines from './pages/Deadlines'
import Jamka from './pages/Jamka'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
            <Route path="ventures" element={<Ventures />} />
            <Route path="visa" element={<VisaPath />} />
            <Route path="university" element={<University />} />
            <Route path="savings" element={<Savings />} />
            <Route path="deadlines" element={<Deadlines />} />
            <Route path="jamka" element={<Jamka />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
