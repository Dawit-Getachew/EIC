import { ErrorMessage } from "../Helpers/error_message";

export class EmailValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return EmailValidation.failed;
  }

  public static validate(value: any) {
    return EmailValidation.run(value);
  }

  private static run(value: any) {
    let regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    value = value ? value.toLocaleLowerCase().trim() : value;
    if (regularExpression.test(value)) {
      return true;
    }
    EmailValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return EmailValidation.failed ? ErrorMessage.email(fieldName) : null;
  }

}