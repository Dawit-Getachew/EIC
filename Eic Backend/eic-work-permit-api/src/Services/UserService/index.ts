import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import UserResolver, { FetchOne, Edit } from "./resolver";
import { IBasicID, IBasicIDs, IUser, IUserDoc, IPostUser, IEditUser, ISigninUser, IChangePassword, IPostCompany, IChangePhone, IChangeEmail } from "../../Models/User/user.types"
import { Validator } from "../../Validator/Validator";
import { UserModel } from "../../Models/User/user.schema";
import { USER_QUEUES } from "../../Common/queue_names";
import { UserRoutes } from "../../Common/routes";
import { RabbitMQProducer } from "../../Connections/RabbitMQ/rabbitmq_producer";
import { Role } from "../../Common/constants";

export class UserService {
  static async fetchUsers() {
    return await (await UserResolver.Query.fetchUsers({}, {}, {})).data
  }

  static async fetchOneUserByID(prop: IBasicID) {
    return await (await UserResolver.Query.fetchOneUserByID({}, prop, {})).data
  }

  static async fetchOneUserByServiceID(prop: IBasicID) {
    return await (await UserResolver.Query.fetchOneUserByServiceID({}, prop, {})).data
  }

  static async fetchManyUsersByID(prop: IBasicIDs) {
    return await (await UserResolver.Query.fetchManyUsersByID({}, prop, {})).data
  }

  static async removeAllUsers() {
    return await (await UserResolver.Mutation.removeAllUsers({}, {}, {})).data
  }

  static async postUser(prop: IPostUser, context: any) {
    // define validation rule
    const validator = new Validator({
      first_name: "required|string",
      middle_name: "string",
      last_name: "required|string",
      email: "required|string|email|unique:email",
      // phone_number: "required|string|unique:phone_number",
      password: "required|string",
    }, prop.input, UserModel);
    await validator.validate();
    if (validator.fails()) {
      return validator.getErrorMessage();
    }
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(prop.input.password, salt);
    prop.input.password = hash;

    const user = await (await UserResolver.Mutation.postUser({}, { input: prop.input }, {})).data
    addUserInfoToSession(context, user, user._id);
    return { ...user }
  }

  static async signInUser(prop: ISigninUser, context: any) {
    // define validation rule
    const validator = new Validator({
      phone_number: "required|string",
      password: "required|string",
    }, prop.input, UserModel);
    // validate data 
    await validator.validate();
    //check if validation fails.
    if (validator.fails()) {
      return validator.getErrorMessage();
    }
    const response = await (await FetchOne(prop.input.phone_number, "phone_number"));
    // check if users phone number exist.
    if (response.status === 200) {
      const user = response.data;
      // check password
      if (bcrypt.compareSync(prop.input.password, user.password)) {
        addUserInfoToSession(context, user, user.service_id); // store user id to session
        return user;
      }
    }
    return { __typename: "ValidationError", error_path: "unknown", errors: [{ error_message: "Invalid phone number or password.", error_code: 400 }] }
  }

  static async editUser(prop: IEditUser) {
    return await (await UserResolver.Mutation.editUser({}, prop, {})).data
  }

  static async removeUser(prop: IBasicID) {
    return await (await UserResolver.Mutation.removeOneUserByID({}, prop, {})).data
  }

  static async removeManyUser(prop: IBasicIDs) {
    return await (await UserResolver.Mutation.removeManyUsersByID({}, prop, {})).data
  }
}

// add user id to session
export function addUserInfoToSession(context: any, user: any, serviceId: any) {
  context.request.req.session.userId = user._id;
  context.request.req.session.role = user.role;
  context.request.req.session.serviceId = serviceId;
  context.request.req.session.isAuthenticated = true;
}

async function sendVerificationCodeToEmail(user: any) {
  const { url, token } = getVerificationRoute(user._id);
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "hadley.durgan48@ethereal.email", // generated ethereal user
      pass: "9Q2RSYr3BWEv2S9pfa", // generated ethereal password
    },
  });

  await transporter.sendMail({
    from: '"Pollux 👻" <dev@pollux.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Verify Email", // Subject line
    html: `<b><a href="${url}">Verify Email</a></b>`, // html body
  });

  const expireAt = Date.now() + 600000
}

function getVerificationRoute(userId: string) {
  const buffer = crypto.randomBytes(100)
  const token = buffer.toString('hex');
  const url = `http://localhost:3000/email/verify/${token}`;
  return { url, token };
}