export class Helper {

  public static getTagName(ruleName: string) {
    return ruleName.split(":")[1];
  }
}