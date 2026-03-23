import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { getProfile, login, signup } from './services/authService';
import AuthPanel from './components/AuthPanel';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthModal from './components/AuthModal';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    (async () => {
      try {
        setLoading(true);
        const profile = await getProfile(token);
        setUser(profile);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const doSignup = async (dto) => {
    try {
      const result = await signup(dto);
      localStorage.setItem('token', result.token);
      setUser(result.user);
      setNotification({ type: 'success', message: 'Cadastro concluído!' });
      navigate('/dashboard');
    } catch (error) {
      setNotification({ type: 'error', message: error?.message || 'Erro no cadastro' });
    }
  };

  const doLogin = async (dto) => {
    try {
      const result = await login(dto);
      localStorage.setItem('token', result.token);
      setUser(result.user);
      setNotification({ type: 'success', message: 'Login realizado!' });
      navigate('/dashboard');
    } catch (error) {
      setNotification({ type: 'error', message: error?.message || 'Erro no login' });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setNotification({ type: 'success', message: 'Logout realizado' });
    navigate('/');
  };

  const requireAuth = () => {
    if (!user) setShowAuthModal(true);
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={logout} onRequireAuth={requireAuth} />
      {notification && (
        <div className={`toast ${notification.type}`}>{notification.message}</div>
      )}

      <Routes>
        <Route path="/" element={<AuthPanel onLogin={doLogin} onSignup={doSignup} loading={loading} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} setNotification={setNotification} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <AuthModal visible={showAuthModal} onClose={() => setShowAuthModal(false)} onRequireAuth={requireAuth} />
    </div>
  );
}

export default App;
