export default function sendEmailConfirmation(
  userName: string,
  verifiedCode: string,
) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Confirmación de cuenta</title>
</head>
<body>
    <h1>Confirmación de Cuenta</h1>
    <p>Hola ${userName},</p>
    <p>Gracias por registrarte en nuestro sitio. Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
    <a href="">${verifiedCode}</a>
    <p>¡Gracias!</p>
</body>
</html>`
}
