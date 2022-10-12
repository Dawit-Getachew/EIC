import { Authorization } from '../../../Helpers/authorization';
import { IPostAccount, ISigninAccount } from '../../../Models/Account/account.types';
import { IBasicID, IBasicIDs } from '../../../Common/interface';
import { AccountService } from "../../../Services/AccountService";
import { AccountActions } from '../../../Graphql/Schema/Account/action';

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUserInfoBySession },
  Mutation: { edit, login, logout, post, removeOne, removeMany, removeAll }
} = AccountActions

const AccountResolver = {
  Query: {
    async [fetchAll]() {
      return (await AccountService.fetchAccounts());
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      return (await AccountService.fetchOneAccountByID(data));
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      return await AccountService.fetchManyAccountsByID(data)
    },
    async [fetchUserInfoBySession](_: any, data: any, context: any) {
      return (await AccountService.fetchOneAccountByID({ _id: context.request.req.session.accountId }));
    },
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      return await AccountService.postAccount(data, context)
    },

    async [login](_: any, data: ISigninAccount, context: any) {
      return await AccountService.signInAccount(data, context)
    },

    async [logout](_: any, data: any, context: any) {
      await context.request.req.session.destroy();
      return { __typename: "Message", message: "Signed out successfully." };
    },

    async [edit](_: any, data: any, context: any) {
      return (await AccountService.editAccount(data));
    },

    async [removeMany](_: any, data: any) {
      return await AccountService.removeManyAccount(data)
    },

    async [removeOne](_: any, data: any) {
      return await AccountService.removeAccount(data)
    },

    async [removeAll](_: any, data: any) {
      return await AccountService.removeAllAccounts()
    },
  }
}

export default AccountResolver