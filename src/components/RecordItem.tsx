import type { RecordItems } from "../types/type";
import { useState } from "react";

type Props = {
  record: RecordItems;
  onDelete: (record: RecordItems) => void;
  exchange: (money: number) => string;
  onUpdate: (record: RecordItems) => void;
};

{
  /* ==============履歴一覧用==============*/
}
export const RecordItem = ({ record, onDelete, exchange, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const profit = record.buyOut - record.buyIn;
  const isITM: boolean = record.buyOut > 0;
  return (
    <div className="ring ring-zinc-900 rounded-xl mt-2 mr-2 p-2 text-left gap-3 flex">
      {/* ==============トーナメント内容============== */}
      <div className="flex-1 min-w-0">
        <div className="flex gap-3 items-center">
          <p className="text-sm">{record.date}</p>
          {isITM && (
            <p className="rounded text-xs ring ring-black px-1 py-0.5">ITM</p>
          )}
          <p className="text-sm">{record.tableSize}Max</p>
          {isEditing && <div className="text-xs text-blue-600">編集中...</div>}
        </div>
        <p>{record.name}</p>
        <div className="grid grid-cols-3">
          <div className="text-left text-sm flex">
            <p>Buy-in:</p>
            <p className="pl-1 text-red-500">{exchange(record.buyIn)}</p>
          </div>
          <div className="text-left text-sm flex">
            <p>Buy-out:</p>
            <p
              className={`pl-1 ${
                record.buyOut > 0 ? "text-green-500" : "text-black"
              }`}
            >
              {exchange(record.buyOut)}
            </p>
          </div>
          <div className="items-center">
            <div className="text-left text-sm flex">
              <p>収支:</p>
              <p
                className={`pl-1 ${
                  profit > 0
                    ? "text-green-500"
                    : profit < 0
                      ? "text-red-500"
                      : "text-black"
                }`}
              >
                {profit >= 0 ? "+" : ""}
                {exchange(profit)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {!isEditing ? (
          <button
            type="button"
            className="text-sm border rounded px-2 py-1 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            編集
          </button>
        ) : (
          <button
            type="button"
            className="text-sm border rounded px-2 py-1 cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            戻る
          </button>
        )}
      </div>
      {/* ==============削除ボタン============== */}
      <button
        type="button"
        className="text-xl leading-none cursor-pointer"
        onClick={() => onDelete(record)}
        disabled={isEditing} // 誤爆防止（好み）
      >
        ×
      </button>
    </div>
  );
};
