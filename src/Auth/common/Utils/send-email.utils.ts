import * as nodemailer from 'nodemailer';
export const sendEmail = async (
  sendMailOptions: nodemailer.SendMailOptions,
) => {
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });
  await transporter.sendMail(sendMailOptions);
};
