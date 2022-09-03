const nodemailer = require('nodemailer')

async function sendVerificationCodeToEmail(user) {
  const url = 'https://'
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    service: 'Gmail',
    auth: {
      user: "hadley.durgan48@ethereal.email", // generated ethereal user
      pass: "9Q2RSYr3BWEv2S9pfa", // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: '"Source Code 👻" <chenet@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Verify Email", // Subject line
    html: `<b><a href="${url}">Verify Email</a></b>`, // html body
  });

  const expireAt = Date.now() + 600000

  // await TokenModel.create({ token, user_id: user._id, expire_at: expireAt });

}

const test = () => {
  sendVerificationCodeToEmail({
    _id: "_id",
    email: "yeabsera0830@gmail.com"
  })
  .then(res => {
    console.log("llz")
  })
  .catch(err => {
    console.log('zzs', err)
  })
}

test()