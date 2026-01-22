import { RecordItem } from "./RecordItem";
import type { RecordItems } from "../types/type";

type Props = {
  records: RecordItems[];
  onDelete: (record: RecordItems) => void;
  exchange: (money: number) => string;
};

export const RecordList = ({ records, onDelete, exchange }: Props) => {
  return (
    <div>
      {records.map((record) => (
        <RecordItem
          key={record.id}
          record={record}
          onDelete={() => onDelete(record)}
          exchange={exchange}
        />
      ))}
    </div>
  );
};
