import { Request, Response, NextFunction } from "express"
import { parse } from "graphql"
import { Role } from "../Common/constants";
import getAllowedActions from "../Graphql/Actions"

class GeneralQuery {
  private isMutation: boolean = false;
  private queryName: string = ""

  private allowedRoles: any[] = []
  private userRole!: Role

  private isAuthorized: boolean = false
  private isAuthenticated: boolean = false

  firstOperationDefinition = (ast: any) => ast.definitions[0];
  firstFieldValueNameFromOperation = (operationDefinition: any) => operationDefinition.selectionSet.selections[0].name.value;


  constructor(query: string, session: any) {
    let parsedQuery = parse(query);
    this.isAuthenticated = Boolean(session.isAuthenticated)
    this.isMutation = String(this.firstOperationDefinition(parsedQuery).operation).toLocaleLowerCase() === "mutation";
    this.queryName = this.firstFieldValueNameFromOperation(this.firstOperationDefinition(parsedQuery))
    this.userRole = session.role ? session.role : Role.PUBLIC_USER;
    console.log("Role: ", this.userRole)
    this.allowedRoles =  getAllowedActions(this.userRole)
    this.isAuthorized = getAllowedActions(this.userRole).findIndex(_query => String(_query) === String(this.queryName)) >= 0
  }

  public getInfo = () => ({
    ...this
  })

  public getUserRole = () => this.userRole

  public getIsAuthorized = () => this.isAuthorized
}

let userObject!: GeneralQuery

export default (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as any
  if (req.body.query) {
    userObject = new GeneralQuery(req.body.query, session);
    if (userObject.getIsAuthorized()) {
      next();
    } else {
      next();
      // res.status(403).json({ status: 403, message: "UnAuthorized." });
    }
  } else {
    next();
  }
}