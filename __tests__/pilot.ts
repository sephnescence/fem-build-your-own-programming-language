type Token = {
  type: string;
  token: string | number;
};

const isParenthesis = ({ token }: { token: string }) => {
  return token === "(" || token === ")";
};

const isWhitespace = ({ token }: { token: string }) => {
  return /\s/.test(token);
};

const isNumber = ({ token }: { token: string }) => {
  return /\d/.test(token);
};

const isLetter = ({ token }: { token: string }) => {
  // Allow a space to count as a letter. isWhitespace MUST be called before isLetter
  // Spaces are only allow in isLetter lookahead
  return /[a-zA-Z ]/.test(token);
};

const isQuote = ({ token }: { token: string }) => {
  return token === '"';
};

const tokenise = ({ input }: { input: string }) => {
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

      tokens.push({
        type: "Whitespace",
        token,
      });
      cursor++;
      continue;
    }

    if (isQuote({ token })) {
      console.log("Is quote");
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

    if (isLetter({ token })) {
      // console.log("Is letter");

      let letters = token;

      while (++cursor < input.length && isLetter({ token: input[cursor] })) {
        letters += input[cursor];
      }

      tokens.push({
        type: "Letter",
        token: letters,
      });

      continue;
    }

    // Steve recommended throwing this exception
    throw new Error(`Invalid token found - ${token}`);
  }

  return tokens;
};

describe("Test tokenise response", () => {
  it("Should return nothing given a blank string", () => {
    const tokens = tokenise({ input: "" });

    expect(tokens).toEqual([]);
  });

  it("Should accept parentheses", () => {
    const tokens = tokenise({ input: "()" });

    const expected: Token[] = [
      {
        type: "Parenthesis",
        token: "(",
      },
      {
        type: "Parenthesis",
        token: ")",
      },
    ];

    expect(tokens).toEqual(expected);
  });

  // Steve ignores whitespace in his example, but surely it should be kept, if only to add to an open String
  it("Should accept whitespace", () => {
    const tokens = tokenise({ input: " " });

    const expected: Token[] = [
      {
        type: "Whitespace",
        token: " ",
      },
    ];

    expect(tokens).toEqual(expected);
  });

  it("Should accept a mix of numbers and letters", () => {
    // Also test the preceding - is dropped
    const tokens = tokenise({ input: "0A" });

    const expected: Token[] = [
      {
        type: "Number",
        token: 0,
      },
      {
        type: "Letter",
        token: "A",
      },
    ];

    expect(tokens).toEqual(expected);
  });

  it("Should accept numbers", () => {
    // Also test the preceding 0 is dropped
    const tokens = tokenise({ input: "01234567890" });

    const expected: Token[] = [
      {
        type: "Number",
        token: 1234567890,
      },
    ];

    expect(tokens).toEqual(expected);
  });

  it("Should accept letters", () => {
    const tokens = tokenise({
      input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
    });

    const expected: Token[] = [
      {
        type: "Letter",
        token: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
      },
    ];

    expect(tokens).toEqual(expected);
  });

  it("Should accept strings", () => {
    const tokens = tokenise({
      input: '"The quick brown fox"',
    });

    const expected: Token[] = [
      {
        type: "String",
        token: "The quick brown fox",
      },
    ];

    expect(tokens).toEqual(expected);
  });

  // Skipped because the Name type wasn't covered in 6,7, or 8. Did it get edited out?
  it.skip("should correctly tokenize a simple expression", () => {
    const tokens = tokenise({
      input: "(add 2 3)",
    });

    const expected: Token[] = [
      { type: "Parenthesis", token: "(" },
      { type: "Name", token: "add" },
      { type: "Number", token: 2 },
      { type: "Number", token: 3 },
      { type: "Parenthesis", token: ")" },
    ];

    expect(tokens).toEqual(expected);
  });
});
