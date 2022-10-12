export class ErrorMessage {
  public static phoneNumber(fieldName: string, countryName: string) {
    return `The ${fieldName} field  value is not valid ${countryName} phone number.`;
  }

  public static integer(fieldName: string) {
    return `The ${fieldName} field  is not valid Integer.`;
  }

  public static email(fieldName: string) {
    return `The ${fieldName} field  is not valid email.`;
  }

  public static string(fieldName: string) {
    return `The ${fieldName} field  is not valid string.`;
  }

  public static number(fieldName: string) {
    return `The ${fieldName} field  is not valid number.`;
  }

  public static required(fieldName: string) {
    return `The ${fieldName} field  is required.`;
  }

  public static unique(fieldName: string) {
    return `The ${fieldName} field  is already taken.`;
  }

  public static exist(fieldName: string) {
    return `The ${fieldName} field  doesn't exist.`;
  }

  public static inValidData(fieldName: string) {
    return `The ${fieldName} field  is not valid data.`;
  }
}