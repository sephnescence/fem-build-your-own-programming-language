import { tokenise } from "../src/tokenise";
import { Token } from "../src/types/token";

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

  it("Should discard whitespace", () => {
    const tokens = tokenise({ input: " " });

    const expected: Token[] = [];

    expect(tokens).toEqual(expected);
  });

  // This is technically invalid syntax, unless during a Transform step, it would become 0 x A
  it("Should accept a mix of numbers and letters", () => {
    const tokens = tokenise({ input: "0A" });

    const expected: Token[] = [
      {
        type: "Number",
        token: 0,
      },
      {
        type: "Name",
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

  it("Should accept names", () => {
    const tokens = tokenise({
      input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",
    });

    const expected: Token[] = [
      {
        type: "Name",
        token: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      {
        type: "Name",
        token: "abcdefghijklmnopqrstuvwxyz",
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

  // There must have been an edit that rename Letter to Name or something
  it("should correctly tokenize a simple expression", () => {
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
