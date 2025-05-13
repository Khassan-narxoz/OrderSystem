import React, { useState } from 'react';
import styles from '../css/LoginForm.module.css';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // өз жолыңызды тексеріңіз

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const token = res.data.access_token;
      console.log(token)
      await login(token);
      toast.success('Успешный вход! Перенаправление...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.error('Ошибка: ' + (error.response?.data?.message || 'Произошла ошибка'));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer />
      <h2 className={styles.loginTitle}>Вход</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.loginInput}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className={styles.loginInput}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.loginButton}>Войти</button>
      </form>
      <p className={styles.redirectText}>
        Новый пользователь? <Link to="/register" className={styles.redirectLink}>Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default LoginForm;
