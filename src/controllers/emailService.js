
import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // O el servicio que estés usando
    auth: {
      user: 'centrodeacopio148@gmail.com',
      pass: 'jlar fbgg lbff rofn', 
    }
  });

  let baseUrl = "http://localhost:5173"

  const resetLink = `${baseUrl}/reset-password?token=${token}`;
  const mailOptions = {
    from: 'centrodeacopio148@gmail.com',
    to: email,
    subject: 'Restablecimiento de contraseña',
    text: `Utiliza este enlace para restablecer tu contraseña: ${resetLink}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Error sending email');
  }
};

