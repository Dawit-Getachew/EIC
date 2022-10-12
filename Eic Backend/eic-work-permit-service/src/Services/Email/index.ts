import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "mail.rahove.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "dev@rahove.com", // generated ethereal user
    pass: "pollux123pollux", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

interface Props {
  emailAddress: string;
  subject: string;
  html: string;
}

export const sentEmail = async (props: Props) => {
  return await transporter.sendMail({
    from: '"EIC 👻" <dev@rahove.com>', // sender address
    to: `${props.emailAddress}`, // list of receivers
    subject: `${props.subject}`, // Subject line
    html: `${props.html}`, // html body
  })
}