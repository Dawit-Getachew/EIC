export enum Roles {
  "ADMIN" = "ADMIN",
  "SUPER_ADMIN" = "SUPER_ADMIN",
}

export class Authorization {
  // check if user is superAdmin or admin.
  public static isAdminOrSuperAdmin(context: any) {
    const session = context.request.req.session;
    if (session.role === Roles.ADMIN || session.role === Roles.SUPER_ADMIN) {
      return true;
    }
    return false;
  }

  // check if user is superAdmin.
  public static isSuperAdmin(context: any) {
    const session = context.request.req.session;
    if (session.role === Roles.SUPER_ADMIN) {
      return true;
    }
    return false;
  }

  // check if user is normal user.
  public static isUser(context: any) {
    const session = context.request.req.session;
    if (session.role === undefined) {
      return true;
    }
    return false;
  }

  // check if user is authenticated.
  public static isAuthenticated(context: any) {
    const session = context.request.req.session;
    if (session.isAuthenticated) {
      return true;
    }
    return false;
  }


  public static getUnAuthorizedError() {
    return {
      __typename: "UnAuthorizationError",
      status: 403,
      error_message: "UnAuthorized."
    }
  }

  public static getUnAuthenticatedError() {
    return {
      __typename: "UnAuthenticatedError",
      status: 401,
      error_message: "UnAthenticated."
    }
  }
}