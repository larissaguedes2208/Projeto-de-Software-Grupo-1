import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CommunityProvider } from './context/CommunityContext'
import { MatchesProvider } from './context/MatchesContext'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import HomePage from './pages/HomePage'
import MatchesPage from './pages/MatchesPage'
import MatchDetailPage from './pages/MatchDetailPage'
import CreateMatchPage from './pages/CreateMatchPage'
import AboutPage from './pages/AboutPage'
import SignupPage from './pages/SignupPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CommunityProvider>
          <MatchesProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/partidas" element={<MatchesPage />} />
                <Route path="/partidas/:id" element={<MatchDetailPage />} />
                <Route path="/comunidade" element={<CommunityPage />} />
                <Route
                  path="/criar-partida"
                  element={
                    <RequireAuth>
                      <CreateMatchPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route path="/cadastro" element={<SignupPage />} />
                <Route path="/sobre" element={<AboutPage />} />
              </Route>
            </Routes>
          </MatchesProvider>
        </CommunityProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
