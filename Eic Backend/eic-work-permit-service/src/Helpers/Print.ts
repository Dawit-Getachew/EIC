import chalk from "chalk";

export class Print {
    private static log: Function = console.log;

    // Log message with red color.
    public static error(...messages: any) {
        this.log(chalk.redBright(...messages))
    }

    // Log message with green color.
    public static success(...messages: any) {
        this.log(chalk.greenBright(...messages));
    }

    // Log message with yellow color.
    public static warning(...messages: any) {
        this.log(chalk.yellowBright(messages));
    }

    // Log message with megenta color.
    public static active(...messages: any) {
        this.log(chalk.magenta(...messages));
    }
}