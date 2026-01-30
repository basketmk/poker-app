export type RecordItems = {
  id: string;
  date: string;
  name: string;
  buyIn: number;
  buyOut: number;
  tableSize: 6 | 9;
};

export type FormValues = {
  date: string;
  name: string;
  buyIn: string;
  buyOut: string;
  tableSize: 6 | 9;
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
  blindSB: number;
  blindBB: number;
  stack: number;
  result: "WIN" | "LOSE" | "CHOP";
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
  blindSB: number;
  blindBB: number;
  stack: number;
  result: "WIN" | "LOSE" | "CHOP";
};

export type FxRatesApiResponse = {
  rates: { JPY: number };
};
