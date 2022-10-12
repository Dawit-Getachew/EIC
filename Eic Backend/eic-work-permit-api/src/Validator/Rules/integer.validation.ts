import _ from "lodash";
import { ErrorMessage } from "../Helpers/error_message";

export class IntegerValidation {
  private static failed: boolean;

  public static getIsFailed() {
    return IntegerValidation.failed;
  }

  public static validate(value: any) {
    return IntegerValidation.run(value);
  }

  private static run(value: any) {
    if (_.isInteger(value)) {
      return true;
    }
    IntegerValidation.failed = true;
    return false;
  }

  public static getErrorMessage(fieldName: string) {
    return IntegerValidation.failed ? ErrorMessage.integer(fieldName) : null;
  }

}