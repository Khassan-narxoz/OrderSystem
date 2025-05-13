<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Код подтверждения</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 480px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 15px;
            text-align: center;
        }
        .code-box {
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 2px;
            color: #34495e;
            margin: 20px 0;
            word-wrap: break-word;
        }
        .message {
            font-size: 16px;
            color: #555555;
            text-align: center;
        }
        .footer {
            margin-top: 25px;
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="title">Ваш код подтверждения</div>
    <div class="message">
        Пожалуйста, введите следующий код в форму регистрации, чтобы подтвердить свой адрес электронной почты:
    </div>
    <div class="code-box">{{ $code }}</div>
    <div class="message">
        Если вы не запрашивали этот код, пожалуйста, проигнорируйте это письмо.
    </div>
    <div class="footer">
        <p>Спасибо, что выбрали наш сервис!</p>
        <p>Если у вас возникли вопросы, вы можете обратиться в нашу службу поддержки: <a href="mailto:ordercontrol@gmail.com">ordercontrol@gmail.com</a></p>
    </div>
</div>
</body>
</html>
