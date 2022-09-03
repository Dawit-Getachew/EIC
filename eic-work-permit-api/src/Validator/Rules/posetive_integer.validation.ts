import _ from "lodash";

export class PositiveIntegerValidation {
  public static validatePositiveInteger(value: any) {
    if (_.isInteger(value))
      return value < 0;
    return false;
  }

}