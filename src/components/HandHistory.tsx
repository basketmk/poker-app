import type { RecordItems } from "../types/type";
import { useState } from "react";

type Props = {
  tournaments: RecordItems[];
};

export const HandHistory = ({ tournaments }: Props) => {
  const [selectedTournamentId, setTournamentId] = useState<string | null>(null);
  

  const selectedTournament = tournaments.find(
    (t) => t.id === selectedTournamentId,
  );

  if (selectedTournamentId === null) {
    return (
      <div>
        <div>トーナメント一覧</div>
        <div className="h-[80vh] overflow-y-auto overscroll-contain">
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

  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <button
          className="cursor-pointer border rounded-2xl p-2"
          onClick={() => setTournamentId(null)}
        >
          一覧へ
        </button>
        <button className="cursor-pointer border rounded-2xl p-2">
          ハンド新規作成＋
        </button>
      </div>

      {selectedTournament != null && (
        <div>
          <div className="border rounded-2xl p-4 m-3 bg-gray-200">
            <div className="text-sm">{selectedTournament.date}</div>
            <div className="text-xl font-bold">{selectedTournament.name}</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-3 flex">
              <div>AhQs</div>
              <div className="text-red-500">V S</div>
              <div>ThTs</div>
            </div>
            <div>メモ（任意）</div>
          </div>
          <div className="flex border p-2 m-2 items-center justify-between">
            <div className="gap-3 flex">
              <div>AhQs</div>
              <div className="text-red-500">V S</div>
              <div>ThTs</div>
            </div>
            <div>メモ（任意）</div>
          </div>
        </div>
      )}
    </div>
  );
};
