import { evaluate } from "../src/evaluate";
import { Expression } from "../src/types/expressions";

describe("Test evaluate response", () => {
  it("Should return nothing given empty lexer results", () => {
    const input: Expression[] = [
      {
        type: "NumberLiteral",
        value: 5,
      },
    ];

    const expected = 5;

    expect(evaluate({ input })).toEqual(expected);
  });

  it("Should return the results of an add statement add 2 3", () => {
    const input: Expression[] = [
      {
        type: "Identifier",
        name: "add",
        value: 0,
        expressions: [
          {
            type: "NumberLiteral",
            value: 2,
          },
          {
            type: "NumberLiteral",
            value: 3,
          },
        ],
      },
    ];

    const expected = 5;

    expect(evaluate({ input })).toEqual(expected);
  });

  it("Should return the results of an add statement (add 2 3)", () => {
    const input: Expression[] = [
      {
        type: "Expression",
        value: 0,
        expressions: [
          {
            type: "Identifier",
            name: "add",
            value: 0,
            expressions: [
              {
                type: "NumberLiteral",
                value: 5,
              },
              {
                type: "NumberLiteral",
                value: 3,
              },
            ],
          },
        ],
      },
    ];

    const expected = 8;

    expect(evaluate({ input })).toEqual(expected);
  });

  it("Should return the results of an add statement subtract 2 3", () => {
    const input: Expression[] = [
      {
        type: "Identifier",
        name: "subtract",
        value: 0,
        expressions: [
          {
            type: "NumberLiteral",
            value: 2,
          },
          {
            type: "NumberLiteral",
            value: 3,
          },
        ],
      },
    ];

    const expected = -1;

    expect(evaluate({ input })).toEqual(expected);
  });

  it("Should return the results of an add statement (add 2 3 (subtract 3 2))", () => {
    const input: Expression[] = [
      {
        type: "Expression",
        value: 0,
        expressions: [
          {
            type: "Identifier",
            name: "add",
            value: 0,
            expressions: [
              { type: "NumberLiteral", value: 2 },
              { type: "NumberLiteral", value: 3 },
              {
                type: "Expression",
                value: 0,
                expressions: [
                  {
                    type: "Identifier",
                    name: "subtract",
                    value: 0,
                    expressions: [
                      { type: "NumberLiteral", value: 3 },
                      { type: "NumberLiteral", value: 2 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const expected = 6;

    expect(evaluate({ input })).toEqual(expected);
  });

  it("Should return the results of an add statement (add 2 (subtract 3 2) 3)", () => {
    const input: Expression[] = [
      {
        type: "Expression",
        value: 0,
        expressions: [
          {
            type: "Identifier",
            name: "add",
            value: 0,
            expressions: [
              { type: "NumberLiteral", value: 2 },
              {
                type: "Expression",
                value: 0,
                expressions: [
                  {
                    type: "Identifier",
                    name: "subtract",
                    value: 0,
                    expressions: [
                      { type: "NumberLiteral", value: 3 },
                      { type: "NumberLiteral", value: 2 },
                    ],
                  },
                ],
              },
              { type: "NumberLiteral", value: 3 },
            ],
          },
        ],
      },
    ];

    const expected = 6;

    expect(evaluate({ input })).toEqual(expected);
  });
});
