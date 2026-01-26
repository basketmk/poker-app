import type { RecordItems, HandFormValue, HandItem } from "../types/type";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  tournaments: RecordItems[];
  onAddHand: (newHand: HandItem) => void;
};

export const HandHistory = ({ tournaments, onAddHand }: Props) => {
  const [selectedTournamentId, setTournamentId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<true | false>(false);

  const selectedTournament = tournaments.find(
    (t) => t.id === selectedTournamentId,
  );

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
    const newHand: HandItem = {
      id: crypto.randomUUID(),
      tournamentId: selectedTournamentId,
      heroPos: value.heroPos,
      heroHand: value.heroHand,
      vilianPos: value.vilianPos,
      vilianHand: value.vilianHand,
      memo: value.memo,
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
            }}
          >
            一覧へ
          </button>
          <button
            className="cursor-pointer border rounded-2xl p-2"
            onClick={() => setIsFormOpen(true)}
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
        <div className="overflow-y-auto overscroll-contain p-3">
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-4 flex">
              <div>
                <div>(Heroポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(Heroハンド)</div>
                <div>AhQh</div>
              </div>
              <div className="text-red-500 flex items-center justify-center">
                V S
              </div>
              <div>
                <div>(Vilianポジション)</div>
                <div>BTN</div>
              </div>
              <div>
                <div>(vilianハンド)</div>
                <div>ThTs</div>
              </div>
            </div>
            <div>メモ（任意）</div>
          </div>
        </div>
      )}
    </div>
  );
};
