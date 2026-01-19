import { RecordItem } from "./RecordItem";
import type { RecordItems } from "../types/type";

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
          record={record}
          onDelete={() => onDelete(record)}
        />
      ))}
    </div>
  );
};
