import bcrypt from "bcrypt";
// import crypto from "crypto";
// import nodemailer from "nodemailer";
import AccountResolver, { FetchOne, Edit } from "./resolver";
import { IBasicID, IBasicIDs, IAccount, IAccountDoc, IPostAccount, IEditAccount, ISigninAccount } from "../../Models/Account/account.types"
import { Validator } from "../../Validator/Validator";
import { AccountModel } from "../../Models/Account/account.schema";
// import { USER_QUEUES } from "../../Common/queue_names";
import { AccountRoutes } from "../../Common/routes";
// import { RabbitMQProducer } from "../../Connections/RabbitMQ/rabbitmq_producer";
// import { Role } from "../../Common/constants";

export class AccountService {
  static async fetchAccounts() {
    return await (await AccountResolver.Query.fetchAccounts({}, {}, {})).data
  }

  static async fetchOneAccountByID(prop: IBasicID) {
    return await (await AccountResolver.Query.fetchOneAccountByID({}, prop, {})).data
  }

  static async fetchManyAccountsByID(prop: IBasicIDs) {
    return await (await AccountResolver.Query.fetchManyAccountsByID({}, prop, {})).data
  }

  static async removeAllAccounts() {
    return await (await AccountResolver.Mutation.removeAllAccounts({}, {}, {})).data
  }

  static async postAccount(prop: IPostAccount, context: any) {
    // define validation rule
    const validator = new Validator({
      first_name: "required|string",
      last_name: "required|string",
      email: "required|string|email|unique:email",
      phone_number: "required|string|phone:et|unique:phone_number",
      password: "required|string",
    }, prop.input, AccountModel);
    await validator.validate();
    if (validator.fails()) {
      return validator.getErrorMessage();
    }
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(prop.input.password, salt);
    prop.input.password = hash;

    const account = await (await AccountResolver.Mutation.postAccount({}, { input: prop.input }, {})).data
    addAccountInfoToSession(context, account, account._id);
    return { ...account }
  }

  static async signInAccount(prop: ISigninAccount, context: any) {
    // define validation rule
    const validator = new Validator({
      phone_number: "required|string|phone:et",
      password: "required|string",
    }, prop.input, AccountModel);
    // validate data 
    await validator.validate();
    //check if validation fails.
    if (validator.fails()) {
      return validator.getErrorMessage();
    }
    const response = await (await FetchOne(prop.input.phone_number, "phone_number"));
    // check if accounts phone number exist.
    if (response.status === 200) {
      const account = response.data;
      // check password
      if (bcrypt.compareSync(prop.input.password, account.password)) {
        addAccountInfoToSession(context, account, account.service_id); // store account id to session
        return account;
      }
    }
    return { __typename: "ValidationError", error_path: "unknown", errors: [{ error_message: "Invalid phone number or password.", error_code: 400 }] }
  }

  static async editAccount(prop: IEditAccount) {
    return await (await AccountResolver.Mutation.editAccount({}, prop, {})).data
  }

  static async removeAccount(prop: IBasicID) {
    return await (await AccountResolver.Mutation.removeOneAccountByID({}, prop, {})).data
  }

  static async removeManyAccount(prop: IBasicIDs) {
    return await (await AccountResolver.Mutation.removeManyAccountsByID({}, prop, {})).data
  }
}

// add account id to session
export function addAccountInfoToSession(context: any, account: any, serviceId: any) {
  context.request.req.session.accountId = account._id;
  context.request.req.session.role = account.role;
  context.request.req.session.serviceId = serviceId;
  context.request.req.session.isAuthenticated = true;
}