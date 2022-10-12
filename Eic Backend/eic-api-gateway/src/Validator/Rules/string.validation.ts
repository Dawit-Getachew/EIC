import _ from "lodash";
import { ErrorMessage } from "../Helpers/error_message";

export class StringValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return StringValidation.failed;
  }

  public static validate(value: any) {
    value = value ? value.trim() : value;
    return _.isString(value);
  }

  private static run(value: any) {
    value = value ? value.trim() : value;
    if (_.isString(value)) {
      return true;
    }
    StringValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return StringValidation.failed ? ErrorMessage.string(fieldName) : null;
  }
}