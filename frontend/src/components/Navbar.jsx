import React, { useContext, useState } from 'react';
import styles from '../css/Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CreateProductsFormModal from '../modals/CreateProductsFormModal';
import { createProduct, LogoutSystem } from '../api';
import { toast } from 'react-toastify';


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleCreateProduct = async (formData) => {
    try {
      setIsLoading(true);
      setError(null); 
      await createProduct(formData);
      toast.success('Товар успешно создан! ✅');
      setModalOpen(false);
    } catch (err) {
      toast.error('Ошибка при создании товара. ❌');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLogout = async() => {
    await LogoutSystem();
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-logo']}>Order Control</div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles['navbar-links']} ${isMenuOpen ? styles.open : ''}`}>
        <li className={styles.li}><Link to="/">Home</Link></li>
        <li className={styles.li}><Link to="/products">Список товаров</Link></li>
        {user?.role === 'Admin' ? (
          <li className={styles.li}>
            <Link to="/all-orders">Все Заказы</Link>
          </li>
        ) : (
          <li className={styles.li}>
            <Link to="/my-orders">Мои Заказы</Link>
          </li>
        )}
        {user?.role === 'Admin' && (
          <li>
            <button onClick={handleModalOpen} className={styles['create-button']}>
              Создать товар
            </button>
          </li>
        )}
        {user && (
          <li className={styles['user-info']}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles['user-details']}>
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
            <button className={styles['logout-button']} onClick={handleLogout}>
              Выход
            </button>
          </li>
        )}
        {isModalOpen && (
          <CreateProductsFormModal
            onClose={handleModalClose}
            onCreate={handleCreateProduct}
            isLoading={isLoading}
            error={error} 
          />
        )}
      </ul>
    </nav>
  );
}
