export default function sendResetPassword(
  newVerifyCode: string,
  userName: string,
) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recupera tu contraseña</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            width: 100%;
            overflow-x: hidden;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            box-sizing: border-box;
        }
        h1 {
            color: #333333;
            font-size: 24px;
            text-align: center;
            margin: 0 0 20px;
        }
        p {
            color: #555555;
            line-height: 1.6;
            margin: 10px 0;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .copy-btn {
            display: inline-block;
            background-color: #28a745;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
        }
        .copy-btn:hover {
            background-color: #218838;
        }
        .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Recupera tu contraseña</h1>
        <p>Hola ${userName},</p>
        <p>Has iniciado la recuperación de tu cuenta. Copia el siguiente código y pégalo donde sea necesario:</p>
        <div class="button-container">
            <span class="copy-btn"">${newVerifyCode}</span>
        </div>
        <p style="text-align: center;">¡Gracias!</p>
        <div class="footer">
            &copy; 2024 Sistemas Redes, Policía de Córdoba. Todos los derechos reservados.
        </div>
    </div>

</body>
</html>


`
}
