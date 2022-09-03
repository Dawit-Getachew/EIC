import _ from "lodash";
import { ErrorMessage } from "../Helpers/error_message";

export class RequiredValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return RequiredValidation.failed;
  }

  public static validate(value: any) {
    return RequiredValidation.run(value);
  }

  private static run(value: any) {
    value = value ? value.trim() : value;
    if (!_.isEmpty(value)) {
      return true;
    }
    RequiredValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return RequiredValidation.failed ? ErrorMessage.required(fieldName) : null;
  }
}