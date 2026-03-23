const AuthModal = ({ visible, onClose, onRequireAuth }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Você precisa estar logado</h3>
        <p>Para acessar essa funcionalidade, faça login ou cadastre-se.</p>
        <div className="modal-actions">
          <button className="secondary-btn" onClick={() => { onRequireAuth(); onClose(); }}>
            Login
          </button>
          <button className="primary-btn" onClick={() => { onRequireAuth(); onClose(); }}>
            Cadastro
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
