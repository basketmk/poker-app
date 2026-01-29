export type RecordItems = {
  id: string;
  date: string;
  name: string;
  buyIn: number;
  buyOut: number;
  tableSize: number;
};

export type FormValues = {
  date: string;
  name: string;
  buyIn: string;
  buyOut: string;
  tableSize: number;
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
};
