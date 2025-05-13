import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerifyEmailModal from '../modals/VerifyEmailModal';
import styles from '../css/RegisterForm.module.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser, sendCode } from '../api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCancel = () => {
    setShowModal(false);
    setVerifyCode('');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    const code = generateCode();
    setGeneratedCode(code);
    setShowModal(true);

    try {
      await sendCode(formData.email, code);
      toast.success('Код был отправлен на вашу почту');
    } catch (error) {
      toast.error('Произошла ошибка при отправке кода');
    }
  };

  const handleCodeVerify = async () => {
    if (verifyCode === generatedCode) {
      try {
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        toast.success('Регистрация прошла успешно!');
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        toast.error('Ошибка при регистрации');
      }
    } else {
      toast.error('Неверный код');
    }
  };

  return (
    <div className={styles.registerContainer}>
        <ToastContainer />
      <h2 className={styles.registerTitle}>Регистрация</h2>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <input className={styles.registerInput} name="name" placeholder="Имя" value={formData.name} onChange={handleChange} required />
        <input className={styles.registerInput} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className={styles.registerInput} type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
        <input className={styles.registerInput} type="password" name="confirmPassword" placeholder="Подтвердите пароль" value={formData.confirmPassword} onChange={handleChange} required />
        <button className={styles.registerButton} type="submit">Зарегистрироваться</button>
      </form>
      <p className={styles.redirectText}>
        Уже зарегистрированы? <Link to="/login" className={styles.redirectLink}>Войти</Link>
      </p>

      {showModal && (
        <VerifyEmailModal
          email={formData.email}
          verifyCode={verifyCode}
          setVerifyCode={setVerifyCode}
          handleCodeVerify={handleCodeVerify}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default RegisterForm;
