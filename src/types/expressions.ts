export type Expression = {
  type: string;
  name?: string;
  value: string | number;
  expressions?: Expression[];
};
