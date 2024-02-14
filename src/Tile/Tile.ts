export type Tile = {
  title: string;
  text: string;
  treasures: number;
  actions: Array<Action>;
};

type Action = { name: string; quantity: number };
