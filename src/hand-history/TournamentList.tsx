import type { RecordItems } from "../types/type";

type Props = {
  tournaments: RecordItems[];
  onSelectTournament: (id: string) => void;
};

export const TournamentList = ({ tournaments, onSelectTournament }: Props) => {
  return (
    <div className="h-[90vh]">
      <div className="text-xl font-bold p-3">トーナメント一覧</div>
      <div className="h-[75vh] overflow-y-auto overscroll-contain">
        {tournaments.map((tournament: RecordItems) => (
          <button
            className="flex items-center justify-between border rounded-xl p-3 mt-3 w-full cursor-pointer"
            onClick={() => onSelectTournament(tournament.id)}
            key={tournament.id}
          >
            <div>{tournament.date}</div>
            <div>{tournament.name}</div>
            <div>{tournament.tableSize}Max</div>
          </button>
        ))}
      </div>
    </div>
  );
};
