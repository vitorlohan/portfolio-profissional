// ============================================
// Página de Login do Admin
// ============================================
import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contextos/AuthContexto';
import { useIdioma } from '../../contextos/IdiomaContexto';
import styles from './PaginaLogin.module.css';

const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const { t } = useIdioma();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login({ email, senha });
      navigate('/admin');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { erro?: string } } };
      setErro(error.response?.data?.erro || t('login.erroLogin'));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <h1 className={styles.login__titulo}>{t('login.titulo')}</h1>
        <p className={styles.login__subtitulo}>
          {t('login.subtitulo')}
        </p>

        <form onSubmit={handleSubmit}>
          {erro && <div className={styles.login__erro}>{erro}</div>}

          <div className={styles.login__campo}>
            <label className={styles.login__label}>{t('login.email')}</label>
            <input
              type="email"
              className={styles.login__input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.com"
              required
            />
          </div>

          <div className={styles.login__campo}>
            <label className={styles.login__label}>{t('login.senha')}</label>
            <input
              type="password"
              className={styles.login__input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.login__btn}
            disabled={carregando}
          >
            {carregando ? t('login.entrando') : t('login.entrar')}
          </button>
        </form>

        <Link to="/" className={styles.login__voltar}>
          {t('login.voltar')}
        </Link>
      </div>
    </div>
  );
};

export default PaginaLogin;
