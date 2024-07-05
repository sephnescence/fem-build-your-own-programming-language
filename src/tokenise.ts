import {
  isName,
  isNumber,
  isParenthesis,
  isQuote,
  isWhitespace,
} from "./tokeniseHelpers";
import { Token } from "./types/token";

export const tokenise = ({ input }: { input: string }) => {
  const tokens: Token[] = [];

  let cursor = 0;
  while (cursor < input.length) {
    const token = input[cursor];
    // console.log(`Encountered token - ${token}`);

    if (isParenthesis({ token })) {
      // console.log("Is parenthesis");

      tokens.push({
        type: "Parenthesis",
        token,
      });
      cursor++;
      continue;
    }

    if (isWhitespace({ token })) {
      // console.log("Is whitespace");
      cursor++;
      continue;
    }

    if (isQuote({ token })) {
      // console.log("Is quote");

      // Exclude the opening quote
      let strValue = "";

      while (++cursor < input.length && !isQuote({ token: input[cursor] })) {
        strValue += input[cursor];
      }

      if (cursor === input.length && !isQuote({ token: input[cursor] })) {
        throw new Error("String was never closed");
      }

      cursor++; // We're excluding the closing quote as well

      tokens.push({
        type: "String",
        token: strValue,
      });

      continue;
    }

    if (isNumber({ token })) {
      // console.log("Is number");

      let number = token;

      while (++cursor < input.length && isNumber({ token: input[cursor] })) {
        number += input[cursor];
      }

      tokens.push({
        type: "Number",
        token: parseInt(number, 10),
      });

      continue;
    }

    if (isName({ token })) {
      // console.log("Is name");

      let name = token;

      while (++cursor < input.length && isName({ token: input[cursor] })) {
        name += input[cursor];
      }

      tokens.push({
        type: "Name",
        token: name,
      });

      continue;
    }

    // Steve recommended throwing this exception
    throw new Error(`Invalid token found - ${token}`);
  }

  return tokens;
};
