import React, { useEffect, useState, useContext } from 'react';
import ProductCards from '../cards/ProductCards';
import { getAllProducts, deleteProductById, createOrder} from '../api';
import styles from '../css/ProductsPage.module.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import UpdateProductsFormModal from '../modals/UpdateProductsFormModal';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(1000);


  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при получении товаров:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const handleAddToOrder = (productWithQuantity) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productWithQuantity.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productWithQuantity.id
            ? { ...item, quantity: item.quantity + productWithQuantity.quantity }
            : item
        );
      } else {
        return [...prevItems, productWithQuantity];
      }
    });
    setIsCartOpen(true);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот товар?');
    if (!confirmDelete) return;
    try {
      await deleteProductById(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Товар успешно удалён!');
    } catch (error) {
      toast.error('Ошибка при удалении товара!');
      console.error('Ошибка при удалении товара:', error);
    }
  };

  const handleIncrease = (id) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setOrderItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (orderItems.length === 0) return;
  
    const orderData = {
      shipping_cost: shippingCost,
      items: orderItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };
  
    try {
      await createOrder(orderData);
      toast.success('Заказ успешно оформлен!');
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
  
      setOrderItems([]);
      setIsCartOpen(false);
    } catch (error) {
      toast.error(error);
      console.error('Ошибка при оформлении заказа:', error);
    }
  };
  

  return (
    <div className={styles.pageContainer_fancy_1}>
      <h1 className={styles.pageTitle_fancy_1}>Список товаров</h1>
      <div className={styles.content_flex_fancy_1}>
      <div className={styles.cardGrid_fancy_1} style={user?.role === 'Admin' ? { width: '100%' } : {}}>
      {products
        .filter(product => product.stock !== 0)
        .map(product => (
          <ProductCards
            key={product.id}
            product={product}
            onAddToOrder={handleAddToOrder}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        </div>

        {user?.role === 'User' && (
        <div className={styles.orderSidebar_fancy_1}>
          <button onClick={toggleCart} className={styles.toggleCartButton}>
            {isCartOpen ? 'Скрыть корзину' : 'Показать корзину'}
          </button>

          {isCartOpen && (
            <>
              <h2>Корзина</h2>
              {orderItems.length === 0 ? (
                <p>Пусто</p>
              ) : (
                <>
                  <ul className={styles.orderList_fancy_1}>
                    {orderItems.map(item => (
                      <li key={item.id} className={styles.orderItem_fancy_1}>
                        <span>{item.title}</span>
                        <div className={styles.quantityControls_fancy_1}>
                          <button onClick={() => handleDecrease(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrease(item.id)}>+</button>
                        </div>
                        <span>{item.quantity * item.price} ₸</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.total_fancy_1}>
                    <p>Доставка: {shippingCost} ₸</p>
                    <strong>Итог: {totalAmount + shippingCost} ₸</strong>
                    </div>

                    <button className={styles.checkoutButton_fancy_1} onClick={handleCheckout}>
                    Оформить заказ
                    </button>
                </>
              )}
            </>
          )}
        </div>
        )}
      </div>

      {isEditModalOpen && (
        <UpdateProductsFormModal
          product={productToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
