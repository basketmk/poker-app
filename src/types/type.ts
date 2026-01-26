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
  vilianPos: string;
  vilianHand: string;
  memo: string;
};

export type HandItem = {
  id: string;
  tournamentId: string;
  heroPos: string;
  heroHand: string;
  vilianPos: string;
  vilianHand: string;
  memo: string;
};
