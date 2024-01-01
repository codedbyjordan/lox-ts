import { Lexer } from "./Lexer";
import type { Token } from "./Token";

export class Lox {
  static hadError: boolean;

  private static async runFile(path: string): Promise<void> {
    const source = await Bun.file(path).text();
    this.run(source);
  }

  public static runPrompt(): void {
    while (true) {
      const input = prompt(">>");
      if (input == null) break;
      this.run(input);
      this.hadError = false;
    }
  }

  private static run(source: string): void {
    const lexer = new Lexer(source);
    const tokens: Token[] = lexer.scanTokens();

    // For now, just print the tokens.
    for (const token of tokens) {
      console.log(token);
    }
  }

  static error(line: number, message: string): void {
    this.report(line, "", message);
  }

  private static report(line: number, where: string, message: string) {
    console.error("[line " + line + "] Error" + where + ": " + message);
    this.hadError = true;
  }
}
