<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Новый заказ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 25px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        h2 {
            color: #2c3e50;
        }
        .order-info {
            margin-top: 20px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="email-container">
    <h2>Новый заказ получен</h2>

    <div class="order-info">
        <p><strong>Пользователь:</strong> {{ $order->user->name }} ({{ $order->user->email }})</p>
        <p><strong>Номер заказа:</strong> #{{ $order->id }}</p>
        <p><strong>Стоимость доставки:</strong> {{ $order->shipping_cost }} ₸</p>
    </div>

    <div class="footer">
        Это автоматическое уведомление. Пожалуйста, не отвечайте на это письмо.
    </div>
</div>
</body>
</html>
