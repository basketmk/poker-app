import { RecordItem } from "./RecordItem";

export type RecordItems = {
  id: string;
  date: string;
  name: string;
  buyIn: number;
  buyOut: number;
};

type Props = {
  records: RecordItems[];
  onDelete: (record: RecordItems) => void;
};

export const RecordList = ({ records, onDelete }: Props) => {
  return (
    <div>
      {records.map((record) => (
        <RecordItem
          key={record.id}
          id={record.id}
          date={record.date}
          name={record.name}
          buyIn={record.buyIn}
          buyOut={record.buyOut}
          onDelete={() => onDelete(record)}
        />
      ))}
    </div>
  );
};
