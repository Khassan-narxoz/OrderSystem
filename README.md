
# 🛒 OrderControl

OrderControl — это веб-приложение для управления заказами и товарами, разработанное с использованием **Laravel (Backend)** и **React (Frontend)**.

---

## 📁 Структура проекта

```
OrderControl/
├── Backend/         # Laravel backend (API)
└── Frontend/        # React frontend
```

---

## 🚀 Запуск проекта

### 🔧 Backend (Laravel)

#### 1. Установка зависимостей
```bash
cd backend
composer install
```

#### 2. Копирование переменных окружения и генерация ключа
```bash
cp .env.example .env
php artisan key:generate
```

#### 3. Настройка базы данных

Откройте файл `.env` и укажите данные вашей базы данных:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=OrderControl
DB_USERNAME=postgres
DB_PASSWORD=hasan200476h@
```

#### 4. Выполнение миграций и сидов
```bash
php artisan migrate
php artisan db:seed
```

#### 5. Установка и настройка Sanctum
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

#### 6. Запуск сервера
```bash
php artisan serve
```

API будет доступен по адресу `http://localhost:8000`

---

### 💻 Frontend (React)

#### 1. Установка зависимостей
```bash
cd frontend
npm install
```

#### 2. Запуск проекта
```bash
npm start
```

Приложение будет доступно по адресу: `http://localhost:3000`

---

## 🔐 Аутентификация

Для авторизации используется Laravel Sanctum. После успешного входа необходимо передавать токен в заголовке запроса:

```
Authorization: Bearer <ваш_токен>
```

---

## 📦 Основные API маршруты

| Метод | Маршрут                 | Описание |
|-------|-------------------------|---------------------------------|
| POST  | `/api/register`         | Регистрация пользователя        |
| POST  | `/api/send-code`        | Отправка кода подтверждения     |
| POST  | `/api/login`            | Авторизация пользователя        |
| POST  | `/api/logout`           | Выход пользователя              |
| GET   | `/api/users/me`         | Получение текущего пользователя |
| GET   | `/api/products`         | Получение всех товаров          |
| POST  | `/api/products`         | Добавление товара               |
| PUT   | `/api/products/{id}`    | Обновление товара               |
| DELETE| `/api/products/{id}`    | Удаление товара                 |
| POST  | `/api/orders`           | Создание заказа                 |
| GET   | `/api/orders/user`      | Получение заказов               |
                                  | текущего пользователя           |
| GET   | `/api/orders/all`       | Получение всех заказов          |
                                  |  (для  администратора)          |


---

## 👨‍💻 Авторы

- Автор: *[Турганбеков_Хасан]*
- Контакт: *[turganbekovhasan4@gmail.com]*

---
