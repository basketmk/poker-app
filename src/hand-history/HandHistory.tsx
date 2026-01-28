import type { RecordItems, HandFormValue, HandItem } from "../types/type";
import { useState } from "react";
import { TournamentList } from "./TournamentList";
import { HandList } from "./HandList";
import { HandForm } from "./HandForm";

type Props = {
  tournaments: RecordItems[];
  onAddHand: (newHand: HandItem) => void;
  hands: HandItem[];
  onDeleteHand: (hand: HandItem) => void;
};

export const HandHistory = ({
  tournaments,
  onAddHand,
  hands,
  onDeleteHand,
}: Props) => {
  const [selectedTournamentId, setTournamentId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<true | false>(false);
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

  const selectedTournament = tournaments.find(
    (t) => t.id === selectedTournamentId,
  );

  //==============メモ選択関数==============
  const toggleMemo = (id: string) => {
    setSelectedMemoId((prev) => (prev === id ? null : id));
  };

  const onSubmit = (value: HandFormValue) => {
    if (selectedTournamentId === null) return;

    const heroPos = value.heroPos.trim();
    const heroHand = value.heroHand.trim();
    const vilianPos = value.vilianPos.trim();
    const vilianHand = value.vilianHand.trim();
    const memo = value.memo.trim();
    const preflop = heroHand;
    const flop = value.flop.trim();
    const turn = value.turn.trim();
    const river = value.river.trim();

    if (!heroPos || !heroHand || !vilianPos) {
      alert("Heroポジション・Heroハンド・Vilianポジションを入力してください");
      return;
    }

    const newHand: HandItem = {
      id: crypto.randomUUID(),
      tournamentId: selectedTournamentId,
      heroPos,
      heroHand,
      vilianPos,
      vilianHand,
      memo,
      preflop,
      flop,
      turn,
      river,
    };

    onAddHand(newHand);
    setIsFormOpen(false);
  };

  //==============トーナメント未選択時==============
  if (selectedTournamentId === null) {
    return (
      <TournamentList
        tournaments={tournaments}
        onSelectTournament={setTournamentId}
      />
    );
  }

  //==============トーナメントとハンド履歴の合致==============
  const filteredHands: HandItem[] = hands.filter(
    (hand) => selectedTournamentId === hand.tournamentId,
  );

  //==============トーナメント選択時==============
  return (
    <div className="h-[80vh] flex flex-col">
      <div className="">
        <div className="flex items-center justify-between m-3">
          <button
            className="cursor-pointer border rounded-2xl p-2"
            onClick={() => {
              setTournamentId(null);
              setIsFormOpen(false);
              setSelectedMemoId(null);
            }}
          >
            一覧へ
          </button>
          <button
            className="cursor-pointer border rounded-2xl p-2"
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            ハンド新規作成＋
          </button>
        </div>
        {/* ==============選択されたトーナメント============== */}
        {selectedTournament != null && (
          <div className="border rounded-2xl p-4 m-3 bg-gray-200">
            <div className="text-sm">{selectedTournament.date}</div>
            <div className="text-xl font-bold">{selectedTournament.name}</div>
          </div>
        )}
        {/* ==============ハンド新規登録フォーム============== */}
        {isFormOpen === true && <HandForm onSubmit={onSubmit} />}
      </div>
      {/* ==============ハンド履歴============== */}
      {selectedTournament != null && (
        <HandList
          hands={filteredHands}
          selectedMemoId={selectedMemoId}
          onDeleteHand={onDeleteHand}
          toggleMemo={toggleMemo}
        />
      )}
    </div>
  );
};
