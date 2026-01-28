import type { HandItem } from "../types/type";

type Props = {
  hands: HandItem[];
  selectedMemoId: string | null;
  onDeleteHand: (hand: HandItem) => void;
  toggleMemo: (id: string) => void;
};

export const HandList = ({
  hands,
  selectedMemoId,
  onDeleteHand,
  toggleMemo,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-3 w-full">
      {hands.map((hand: HandItem) => {
        const isOpenMemo = selectedMemoId === hand.id;
        return (
          <div key={hand.id} className="border p-2 m-3">
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
                  <div className="ml-3">詳細</div>
                  <button
                    className="ml-3 text-sm rounded-3xl cursor-pointer w-8 h-5"
                    onClick={() => {
                      toggleMemo(hand.id);
                    }}
                  >
                    {isOpenMemo ? "▲" : "▼"}
                  </button>
                </div>
                {selectedMemoId === hand.id && (
                  <div className="items-left">
                    <div className="flex gap-3 ml-3">
                      <div>{hand.flop}</div>
                      <div>{hand.turn}</div>
                      <div>{hand.river}</div>
                    </div>
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
  );
};
