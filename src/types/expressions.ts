export type Expression = {
  type: string;
  value: string | number;
  expressions?: Expression[];
};
