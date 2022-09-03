import nodemailer from 'nodemailer'
import { EmailActions } from '../../Schema/Email/action'
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

const sendEmail = async (props: Props) => {
  return await transporter.sendMail({
    from: '"EIC 👻" <dev@rahove.com>', // sender address
    to: `${props.emailAddress}`, // list of receivers
    subject: `${props.subject}`, // Subject line
    html: `${props.html}`, // html body
  })
}

interface GQLInput {
  input: Props;
}

const EmailResolver = {
  Mutation: {
    async [EmailActions.Mutation.post](_: any, props: GQLInput, __: any) {
      console.log("hee", props)
      const response = await sendEmail(props.input)
      console.log("res", response)
      return response
    }
  }
}

export default EmailResolver