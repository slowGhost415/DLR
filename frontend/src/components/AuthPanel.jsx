import { useState } from 'react';

const AuthPanel = ({ onLogin, onSignup, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  const toggle = () => {
    setIsLogin((curr) => !curr);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ email: form.email.trim(), senha: form.senha });
    } else {
      if (!form.nome.trim()) return;
      onSignup({ nome: form.nome.trim(), email: form.email.trim(), senha: form.senha });
    }
  };

  return (
    <div className={`auth-outer ${isLogin ? 'login-mode' : 'signup-mode'}`}>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="panel-content">
            <h3>Welcome Back!</h3>
            <p>Seja bem-vindo de volta. Faça login para acessar análises e ferramentas.</p>
            <button onClick={toggle}>Sign In</button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="panel-content">
            <h3>New here?</h3>
            <p>Crie uma conta para começar a usar nosso painel completo.</p>
            <button onClick={toggle}>Sign Up</button>
          </div>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={submit} className="auth-form">
          <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>

          {!isLogin && (
            <div className="field">
              <label>Nome</label>
              <input name="nome" value={form.nome} onChange={handleChange} required={!isLogin} />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="field">
            <label>Senha</label>
            <input type="password" name="senha" value={form.senha} onChange={handleChange} required minLength={6} />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Processando...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="social-icons">
            <span>🌐</span>
            <span>💼</span>
            <span>📱</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPanel;
