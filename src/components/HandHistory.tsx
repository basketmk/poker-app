import type { RecordItems, HandFormValue, HandItem } from "../types/type";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const toggleMemo = (id: string) => {
    setSelectedMemoId((prev) => (prev === id ? null : id));
  };

  const { register, handleSubmit, reset } = useForm<HandFormValue>({
    defaultValues: {
      heroPos: "",
      heroHand: "",
      vilianPos: "",
      vilianHand: "",
      memo: "",
    },
  });

  const onSubmit = (value: HandFormValue) => {
    if (selectedTournamentId === null) return;

    const heroPos = value.heroPos.trim();
    const heroHand = value.heroHand.trim();
    const vilianPos = value.vilianPos.trim();
    const vilianHand = value.vilianHand.trim();
    const memo = value.memo.trim();

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
    };

    onAddHand(newHand);
    reset();
    setIsFormOpen(false);
  };

  //==============トーナメント未選択時==============
  if (selectedTournamentId === null) {
    return (
      <div className="h-[90vh]">
        <div className="text-xl font-bold p-3">トーナメント一覧</div>
        <div className="h-[75vh] overflow-y-auto overscroll-contain">
          {tournaments.map((tournament) => (
            <button
              className="flex items-center justify-between border rounded-xl p-3 mt-3 w-full cursor-pointer"
              onClick={() => setTournamentId(tournament.id)}
              key={tournament.id}
            >
              <div>{tournament.date}</div>
              <div>{tournament.name}</div>
            </button>
          ))}
        </div>
      </div>
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
        {isFormOpen === true && (
          <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">ハンド新規作成フォーム</div>
            <div className="flex items-center justify-between">
              <div className="gap-3 grid grid-cols-5">
                <div>
                  <div>(Heroポジション)</div>
                  <input
                    className="border w-full h-9 p-2 rounded-xl"
                    type="text"
                    placeholder="例) BTN"
                    {...register("heroPos")}
                  />
                </div>
                <div>
                  <div>(Heroハンド)</div>
                  <input
                    className="border w-full h-9 p-2 rounded-xl"
                    type="text"
                    placeholder="例) AhQh"
                    {...register("heroHand")}
                  />
                </div>
                <div className="text-red-500 flex items-center justify-center">
                  V S
                </div>
                <div>
                  <div>(Vilianポジション)</div>
                  <input
                    className="border w-full h-9 p-3 rounded-xl"
                    type="text"
                    placeholder="例) BB"
                    {...register("vilianPos")}
                  />
                </div>
                <div>
                  <div>(vilianハンド)</div>
                  <input
                    className="border w-full h-9 p-3 rounded-xl"
                    type="text"
                    placeholder="例) ThTs"
                    {...register("vilianHand")}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="text-left mt-3 text-break p-2">メモ（任意）</div>
              <textarea
                className="items-left w-full border rounded-xl p-2"
                rows={4}
                {...register("memo")}
              />
            </div>
            <button
              type="submit"
              className="ring rounded-xl min-w-full p-2 mt-4 bg-green-300 cursor-pointer"
            >
              登録する
            </button>
          </form>
        )}
      </div>
      {/* ==============ハンド履歴============== */}
      {selectedTournament != null && (
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 w-full">
          {filteredHands.map((hand) => {
            return (
              <div className="border p-2 m-3">
                <div className="flex items-center justify-between">
                  <div className="flex p-2 m-2 items-center">
                    <div className="gap-4 flex">
                      <div>
                        <div>(Heroポジション)</div>
                        <div>{hand.heroPos}</div>
                      </div>
                      <div>
                        <div>(Heroハンド)</div>
                        <div>{hand.heroHand}</div>
                      </div>
                      <div className="text-red-500 flex items-center justify-center">
                        V S
                      </div>
                      <div>
                        <div>(Vilianポジション)</div>
                        <div>{hand.vilianPos}</div>
                      </div>
                      <div>
                        <div>(vilianハンド)</div>
                        <div>{hand.vilianHand}</div>
                      </div>
                    </div>
                  </div>{" "}
                  <button
                    className="pr-3 cursor-pointer"
                    onClick={() => onDeleteHand(hand)}
                  >
                    ×
                  </button>
                </div>
                {hand.memo && (
                  <div className="">
                    <div className="flex items-left">
                      <div className="ml-3">メモ</div>
                      {selectedMemoId !== hand.id && (
                        <button
                          className="ml-3 text-sm rounded-3xl cursor-pointer w-8 h-5"
                          onClick={() => {
                            toggleMemo(hand.id);
                          }}
                        >
                          ▼
                        </button>
                      )}
                      {selectedMemoId === hand.id && (
                        <button
                          className="ml-3 text-sm rounded-3xl cursor-pointer w-8 h-5"
                          onClick={() => {
                            toggleMemo(hand.id);
                          }}
                        >
                          ▲
                        </button>
                      )}
                    </div>
                    {selectedMemoId === hand.id && (
                      <div className="items-left">
                        <div className="p-3 m-2 text-sm items-left border rounded-3xl">
                          {hand.memo}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
