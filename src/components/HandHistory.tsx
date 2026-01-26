import type { RecordItems } from "../types/type";
import { useState } from "react";

type Props = {
  tournaments: RecordItems[];
};

export const HandHistory = ({ tournaments }: Props) => {
  const [tournamentId, setTournamentId] = useState<string | null>(null);

  if (tournamentId === null) {
    return (
      <div>
        <div>トーナメント一覧</div>
        <div className="h-[80vh] overflow-y-auto overscroll-contain">
          {tournaments.map((tournament) => (
            <button
              className="flex items-center justify-between border rounded-xl p-3 m-2 w-[88vh]  cursor-pointer"
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
    </div>
  );
};
