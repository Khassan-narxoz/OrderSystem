import React, { useState } from 'react';
import styles from '../css/CreateProductsFormModal.module.css';

export default function CreateProductsFormModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    image_url: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <div className={styles.cpModalOverlay}>
      <div className={styles.cpModalContainer}>
        <h2 className={styles.cpModalHeader}>Создать товар</h2>
        <form className={styles.cpModalForm} onSubmit={handleSubmit}>
          <label className={styles.cpModalLabel}>
            Название товара:
            <input
              className={styles.cpModalInput}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.cpModalLabel}>
            Цена:
            <input
              className={styles.cpModalInput}
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.cpModalLabel}>
            Кол-во в наличии:
            <input
              className={styles.cpModalInput}
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.cpModalLabel}>
            URL изображения:
            <input
              className={styles.cpModalInput}
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
            />
          </label>
          <div className={styles.cpModalActions}>
            <button type="submit" className={styles.cpModalSubmitBtn}>
              Создать
            </button>
            <button type="button" className={styles.cpModalCancelBtn} onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
