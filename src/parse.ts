import { Expression } from "./types/expressions";
import { Token } from "./types/token";

export const parse = ({ input }: { input: Token[] }): Expression[] => {
  const expressions: Expression[] = [];

  if (!input.length) {
    return [];
  }

  let token = input.shift();

  while (token !== undefined) {
    console.log(token.type);
    if (token.type === "Name") {
      expressions.push({
        type: "Identifier",
        value: token.token,
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
      const expression: Expression = {
        type: "Expression",
        value: 0,
        expressions: parse({ input }),
      };

      expressions.push(expression);

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
