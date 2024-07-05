import { Expression } from "./types/expressions";
import { Token } from "./types/token";

export const parse = ({ input }: { input: Token[] }): Expression[] => {
  const expressions: Expression[] = [];

  if (!input.length) {
    return [];
  }

  let token = input.shift();

  while (token !== undefined) {
    if (token.type === "Name") {
      expressions.push({
        type: "Identifier",
        name: token.token as string,
        value: 0,
        expressions: parse({ input }),
      });

      token = input.shift();

      continue;
    }

    if (token.type === "Number") {
      expressions.push({
        type: "NumberLiteral",
        value: token.token,
      });

      token = input.shift();

      continue;
    }

    if (token.type === "Parenthesis" && token.token === "(") {
      // Opening bracket
      expressions.push({
        type: "Expression",
        value: 0,
        expressions: parse({ input }),
      });

      token = input.shift();

      continue;
    }

    if (token.type === "Parenthesis" && token.token === ")") {
      token = input.shift();

      // Closing bracket
      return expressions;
    }

    throw new Error("Unexpected token");
  }

  return expressions;
};
