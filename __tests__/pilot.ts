type Token = {
  type: string;
  token: string;
};

const isParenthesis = ({ token }: { token: string }) => {
  return token === "(" || token === ")";
};

const isWhitespace = ({ token }: { token: string }) => {
  return /\s/.test(token);
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

  it("Should should accept parentheses", () => {
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
  it("Should should accept whitespace", () => {
    const tokens = tokenise({ input: " " });

    const expected: Token[] = [
      {
        type: "Whitespace",
        token: " ",
      },
    ];

    expect(tokens).toEqual(expected);
  });
});
