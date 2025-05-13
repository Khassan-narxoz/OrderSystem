import React, { useState, useEffect } from 'react';
import styles from '../css/CreateProductsFormModal.module.css';
import { updateProductById } from '../api';
import { toast } from 'react-toastify';

export default function UpdateProductsFormModal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    image_url: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        stock: product.stock || '',
        image_url: product.image_url || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProductById(product.id, formData);
      onUpdate(updatedProduct);
      toast.success('Товар успешно обновлён!');
      onClose(); 
    } catch (error) {
      toast.error('Ошибка при обновлении товара!');
    }
  };

  return (
    <div className={styles.cpModalOverlay}>
      <div className={styles.cpModalContainer}>
        <h2 className={styles.cpModalHeader}>Редактировать товар</h2>
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
              Сохранить изменения
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
