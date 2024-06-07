
import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // O el servicio que estés usando
    auth: {
      user: 'millerrivera2002@gmail.com',
      pass: 'esvk ivyz kwwh kfti', 
    }
  });

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;
  const mailOptions = {
    from: 'tu_email@gmail.com',
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

