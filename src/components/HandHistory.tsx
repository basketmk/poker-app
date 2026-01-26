import type { RecordItems } from "../types/type";

type Props = {
  tournaments: RecordItems[];
};

export const HandHistory = ({ tournaments }: Props) => {
  return (
    <div>
      <div>トーナメント一覧</div>
      <div className="h-[80vh] overflow-y-auto overscroll-contain">
        {tournaments.map((tournament) => (
          <div className="flex items-center justify-center border rounded-xl p-3 m-2">
            <div>{tournament.date}</div>
            <div>{tournament.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
