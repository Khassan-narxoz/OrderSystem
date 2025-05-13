import React, { useContext, useState } from 'react';
import styles from '../css/ProductCards.module.css';
import { AuthContext } from '../context/AuthContext';

export default function ProductCards({ product, onAddToOrder, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToOrder = () => {
    if (quantity > 0 && quantity <= product.stock) {
      onAddToOrder({ ...product, quantity });
    }
  };

  return (
    <div className={styles.card_fancy_1}>
      <div className={styles.imageWrapper_fancy_1}>
        <img src={product.image_url} alt={product.title} className={styles.image_fancy_1} />
      </div>
      <div className={styles.details_fancy_1}>
        <h2 className={styles.title_fancy_1}>{product.title}</h2>
        <p className={styles.price_fancy_1}>
              Цена: <span className={styles.priceValue_fancy_1}>{product.price} ₸</span>
            </p>
            <p className={styles.stock_fancy_1}>
              В наличии: <span className={styles.stockValue_fancy_1}>{product.stock}</span> шт.
            </p>

            {user?.role === 'User' && (
              <div className={styles.actions_fancy_1}>
                <label className={styles.quantityLabel_fancy_1}>Кол-во:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.quantityInput_fancy_1}
                />
                <button onClick={handleAddToOrder} className={styles.addToOrderButton_fancy_1}>
                  Добавить в заказ
                </button>
              </div>
            )}

            {user?.role === 'Admin' && (
              <div className={styles.adminActions_fancy_1}>
                <button onClick={() => onEdit(product)} className={styles.editButton_fancy_1}>Редактировать</button>
                <button onClick={() => onDelete(product.id)} className={styles.deleteButton_fancy_1}>Удалить</button>
              </div>
            )}
      </div>
    </div>
  );
}
