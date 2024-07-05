import { Expression } from "./types/expressions";

export const evaluate = ({ input }: { input: Expression[] }) => {
  let expression = input.shift();
  let value = 0;

  while (expression !== undefined) {
    if (expression.type === "NumberLiteral") {
      value += expression.value as number;

      expression = input.shift();

      continue;
    }

    if (expression.type === "Identifier" && expression.name === "add") {
      if (!expression.expressions) {
        // Technically an exception since it expects parameters

        expression = input.shift();

        continue;
      }

      const initial = expression.expressions.shift();

      if (initial) {
        value += evaluate({ input: [initial] });
      }

      value += evaluate({
        input: expression.expressions as Expression[],
      });

      expression = input.shift();

      continue;
    }

    if (expression.type === "Identifier" && expression.name === "subtract") {
      if (!expression.expressions) {
        // Technically an exception since it expects parameters

        expression = input.shift();

        continue;
      }

      const initial = expression.expressions.shift();

      if (initial) {
        value += evaluate({ input: [initial] });
      }

      value -= evaluate({
        input: expression.expressions as Expression[],
      });

      expression = input.shift();

      continue;
    }

    if (expression.type === "Expression") {
      value += evaluate({
        input: expression.expressions as Expression[],
      });

      expression = input.shift();

      continue;
    }
  }

  return value;
};
