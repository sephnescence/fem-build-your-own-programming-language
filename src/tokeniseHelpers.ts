export const isParenthesis = ({ token }: { token: string }) => {
  return token === "(" || token === ")";
};

export const isWhitespace = ({ token }: { token: string }) => {
  return /\s/.test(token);
};

export const isNumber = ({ token }: { token: string }) => {
  return /\d/.test(token);
};

// Torn between whether this should be called isIdentifier or isName
export const isName = ({ token }: { token: string }) => {
  return /[a-zA-Z]/.test(token);
};

export const isQuote = ({ token }: { token: string }) => {
  return token === '"';
};
