const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // Bypass the SSL certificate validation
      }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: ['kalebwbishop@gmail.com'],
    subject: 'Subject of your email',
    text: 'Body of your email',
    html: '<b>Hello world?</b>',
  };
  
  transporter.sendMail(mailOptions)
  .then((info) => {
    console.log(`Email sent: ${info.response}`);
  })
  .catch((error) => {
    console.error(`Error sending email: ${error}`);
  });

  async function sendEmail() {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
  
  sendEmail();
  
//   export default sendEmail;