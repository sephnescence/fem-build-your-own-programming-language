import { Expression } from "./types/expressions";
import { Token } from "./types/token";

const peek = (input: Token[]) => {
  if (input.length) {
    return input[0];
  }

  return null;
};

export const parse = ({ input }: { input: Token[] }): Expression[] => {
  const expressions: Expression[] = [];

  if (!input.length) {
    return [];
  }

  let token = input.shift();

  while (token !== undefined) {
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
        value: 4,
        expressions: parse({ input }),
      };

      expressions.push(expression);

      token = input.shift();

      continue;
    }

    if (token.type === "Parenthesis" && token.token === ")") {
      // Closing bracket
      return expressions;
    }
  }

  return expressions;
};
