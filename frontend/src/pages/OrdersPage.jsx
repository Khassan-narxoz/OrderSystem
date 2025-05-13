import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllOrders, getUserOrders } from '../api';
import styles from '../css/OrdersPage.module.css';

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = user?.role === 'Admin'
          ? await getAllOrders()
          : await getUserOrders(user.id);
        setOrders(res);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className={styles.loading}>Загрузка заказов...</div>;
  if (!orders.length) return <div className={styles.empty}>Нет заказов</div>;

  return (
    <div className={styles.ordersContainer}>
      <h2>{user.role === 'Admin' ? 'Все Заказы' : 'Мои Заказы'}</h2>
      {orders.map((order) => {
        const total = order.products.reduce((sum, p) => {
          const price = parseFloat(p.price) || 0;
          return sum + price * p.pivot.quantity;
        }, parseFloat(order.shipping_cost));

        return (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span><strong>ID:</strong> {order.id}</span>
              <span><strong>Дата:</strong> {new Date(order.created_at).toLocaleDateString()}</span>
              <span><strong>Доставка:</strong> {order.shipping_cost}₸</span>
            </div>

            {user.role === 'Admin' && (
              <div className={styles.userInfo}>
                <img
                  src={`https://ui-avatars.com/api/?name=${order.user.name}&background=0D8ABC&color=fff`}
                  alt={order.user.name}
                  className={styles.avatar}
                />
                <div>
                  <div><strong>Имя:</strong> {order.user.name}</div>
                  <div><strong>Email:</strong> {order.user.email}</div>
                </div>
              </div>
            )}
            
            <ul className={styles.productList}>
              {order.products.map((p) => {
                console.log(p);
                const price = parseFloat(p.price) || 0;
                const quantity = p.pivot.quantity;
                return (
                  <li key={p.id} className={styles.productItem}>
                    <img src={p.image_url} alt={p.title} className={styles.productImage} />
                    <div className={styles.productInfo}>
                      <div className={styles.productTitle}>{p.title}</div>
                      <div className={styles.productDetails}>
                        {quantity} шт. × {price.toFixed(2)}₸
                      </div>
                      <div className={styles.productTotal}>
                        = {(quantity * price).toFixed(2)}₸
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={styles.totalPrice}>
              Итоговая цена: <strong>{total.toFixed(2)}₸</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}
