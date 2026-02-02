import { RecordItem } from "./RecordItem";
import type { RecordItems } from "../types/type";

type Props = {
  records: RecordItems[];
  onDelete: (record: RecordItems) => void;
  exchange: (money: number) => string;
  onUpdate: (record: RecordItems) => void;
};

export const RecordList = ({
  records,
  onDelete,
  exchange,
  onUpdate,
}: Props) => {
  return (
    <div className="">
      {records.map((record) => (
        <RecordItem
          key={record.id}
          record={record}
          onDelete={onDelete}
          exchange={exchange}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
