export type RecordItems = {
  id: string;
  date: string;
  name: string;
  buyIn: number;
  buyOut: number;
};

export type FormValues = {
  date: string;
  name: string;
  buyIn: string;
  buyOut: string;
};

export type HandFormValue = {
  heroPos: string;
  heroHand: string;
  villainPos: string;
  villainHand: string;
  memo: string;
  preflop: string;
  flop: string;
  turn: string;
  river: string;
  blind: string;
  stack: string;
};

export type HandItem = {
  id: string;
  tournamentId: string;
  heroPos: string;
  heroHand: string;
  villainPos: string;
  villainHand: string;
  memo: string;
  preflop: string;
  flop: string;
  turn: string;
  river: string;
  blind: string;
  stack: number;
};
