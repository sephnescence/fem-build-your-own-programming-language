import { parse } from "../src/parse";
import { Expression } from "../src/types/expressions";
import { Token } from "../src/types/token";

describe("Test parse response", () => {
  it("Should return nothing given empty lexer results", () => {
    const input: Token[] = [];

    expect(parse({ input })).toEqual([]);
  });

  it("Should convert Number into NumberLiteral", () => {
    const input: Token[] = [
      {
        type: "Number",
        token: 2,
      },
    ];

    const expected: Expression[] = [
      {
        type: "NumberLiteral",
        value: 2,
      },
    ];

    expect(parse({ input })).toEqual(expected);
  });

  it("Should parse parentheses", () => {
    const input: Token[] = [
      {
        type: "Parenthesis",
        token: "(",
      },
      {
        type: "Number",
        token: 4,
      },
      {
        type: "Parenthesis",
        token: ")",
      },
    ];

    const expected: Expression[] = [
      {
        type: "Expression",
        value: 4,
        expressions: [
          {
            type: "NumberLiteral",
            value: 4,
          },
        ],
      },
    ];

    expect(parse({ input })).toEqual(expected);
  });

  it("Parses an add statement (add 2 3)", () => {
    const input: Token[] = [
      { type: "Parenthesis", token: "(" },
      { type: "Name", token: "add" },
      { type: "Number", token: 2 },
      { type: "Number", token: 3 },
      { type: "Parenthesis", token: ")" },
    ];

    const expected: Expression[] = [
      {
        type: "Expression",
        value: 4,
        expressions: [
          { type: "Name", value: "add" },
          { type: "NumberLiteral", value: 2 },
          { type: "NumberLiteral", value: 3 },
        ],
      },
    ];
  });

  it("Parses an add statement with a nest expression (add 2 3 (subtract 3 2))", () => {
    const input: Token[] = [
      { type: "Parenthesis", token: "(" },
      { type: "Name", token: "add" },
      { type: "Number", token: 2 },
      { type: "Number", token: 3 },
      { type: "Parenthesis", token: "(" },
      { type: "Name", token: "subtract" },
      { type: "Number", token: 3 },
      { type: "Number", token: 2 },
      { type: "Parenthesis", token: ")" },
      { type: "Parenthesis", token: ")" },
    ];

    const expected: Expression[] = [
      {
        type: "Expression",
        value: 4,
        expressions: [
          { type: "Name", value: "add" },
          { type: "NumberLiteral", value: 2 },
          { type: "NumberLiteral", value: 3 },
        ],
      },
    ];
  });
});
