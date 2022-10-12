import { Authorization } from '../../../Helpers/authorization';
import { IPostUser, ISigninUser } from '../../../Models/User/user.types';
import { IBasicID, IBasicIDs } from '../../../Common/interface';
import { UserService } from "../../../Services/UserService";
import { UserActions } from '../../../Graphql/Schema/User/action';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUserInfoBySession, fetchUserByServiceID },
  Mutation: {
    edit, login, logout, post, removeOne, removeMany, removeAll,
    changeEmail, changePhoneNumber, changePassword
  }
} = UserActions

const UserResolver = {
  Query: {
    async [fetchAll]() {
      return (await UserService.fetchUsers());
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      return (await UserService.fetchOneUserByID(data));
    },
    async [fetchUserByServiceID](_: any, data: IBasicID) {
      return (await UserService.fetchOneUserByServiceID(data));
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      return await UserService.fetchManyUsersByID(data)
    },
    async [fetchUserInfoBySession](_: any, data: any, context: any) {
      return (await UserService.fetchOneUserByID({ _id: context.request.req.session.userId }));
    },
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      return await UserService.postUser(data, context)
    },

    async [login](_: any, data: ISigninUser, context: any) {
      return await UserService.signInUser(data, context)
    },

    async [logout](_: any, data: any, context: any) {
      await context.request.req.session.destroy();// destroy session.
      return { __typename: "Message", message: "Signed out successfully." };
    },

    async [edit](_: any, data: any, context: any) {
      return (await UserService.editUser(data));
    },

    async [removeMany](_: any, data: any) {
      return await UserService.removeManyUser(data)
    },

    async [removeOne](_: any, data: any) {
      return await UserService.removeUser(data)
    },

    async [removeAll](_: any, data: any) {
      return await UserService.removeAllUsers()
    },
    async [changeEmail](_: any, { input }: {
      input: {
        _id: ObjectId; email: string; password: string;
      }
    }, context: any) {
      const foundUser = await UserService.fetchOneUserByID({ _id: input._id })
      if (!foundUser._id) return foundUser
      const response = await UserService.signInUser({
        input: {
          password: input.password,
          phone_number: foundUser.phone_number
        }
      }, context) as any
      if (!response._id) return response
      return await UserService.editUser({
        input: {
          _id: String(foundUser._id),
          email: input.email
        }
      })
    },
    async [changePhoneNumber](_: any, { input }: {
      input: {
        _id: ObjectId; phone_number: string; password: string;
      }
    }, context: any) {
      const foundUser = await UserService.fetchOneUserByID({ _id: input._id })
      if (!foundUser._id) return foundUser
      const response = await UserService.signInUser({
        input: {
          password: input.password,
          phone_number: foundUser.phone_number
        }
      }, context) as any
      if (!response._id) return response
      return await UserService.editUser({
        input: {
          _id: String(foundUser._id),
          phone_number: input.phone_number
        }
      })
    },
    async [changePassword](_: any, { input }: {
      input: {
        _id: ObjectId; old_password: string; new_password: string;
      }
    }, context: any) {
      const foundUser = await UserService.fetchOneUserByID({ _id: input._id })
      if (!foundUser._id) return foundUser
      const response = await UserService.signInUser({
        input: {
          password: input.old_password,
          phone_number: foundUser.phone_number
        }
      }, context) as any
      if (!response._id) return response
      const saltRounds = 12;
      const salt = bcrypt.genSaltSync(saltRounds);
      const password = bcrypt.hashSync(input.new_password, salt);
      return await UserService.editUser({
        input: {
          _id: String(foundUser._id),
          password
        }
      })
    },
  }
}

export default UserResolver