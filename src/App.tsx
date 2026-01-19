import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  type Props = {
    id: string;
    date: string;
    name: string;
    buyIn: number;
    buyOut: number;
    onDelete: void;
  };

  {
    /* ==============履歴一覧用==============*/
  }
  const Record = (props: Props) => {
    const profit = props.buyOut - props.buyIn;
    const isITM: boolean = props.buyOut > 0;
    return (
      <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left gap-3 flex">
        {/* ==============トーナメント内容============== */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-3 items-center">
            <p className="text-sm">{props.date}</p>
            {isITM && (
              <p className="rounded text-xs ring ring-black px-1 py-0.5">ITM</p>
            )}
          </div>
          <p>{props.name}</p>
          <div className="grid grid-cols-3">
            <div className="text-left text-sm flex">
              <p>Buy-in:</p>
              <p className="pl-1 text-red-500">${props.buyIn}</p>
            </div>
            <div className="text-left text-sm flex">
              <p>Buy-out:</p>
              <p
                className={`pl-1 ${
                  props.buyOut > 0 ? "text-green-500" : "text-black"
                }`}
              >
                ${props.buyOut}
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
                  {profit}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ==============削除ボタン============== */}
        <button
          type="button"
          className="shrink-0 text-xl leading-none"
          onClick={props.onDelete}
        >
          ×
        </button>
      </div>
    );
  };
  {
    /* ==============履歴削除用関数============== */
  }
  const handleDelete = (record: RecordItems) => {
    if (!confirm(`${record.name} を削除しますか？`)) return;

    setRecords((prev) => {
      const newItems = prev.filter((r) => r.id !== record.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });
  };

  type RecordItems = {
    id: string;
    date: string;
    name: string;
    buyIn: number;
    buyOut: number;
  };

  const STORAGE_KEY = "poker_record";
  const [records, setRecords] = useState<RecordItems[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecordItems[];
  });

  const recordList = records.map((record) => {
    return (
      <Record
        key={record.id}
        id={record.id}
        date={record.date}
        name={record.name}
        buyIn={record.buyIn}
        buyOut={record.buyOut}
        onDelete={() => handleDelete(record)}
      />
    );
  });
  {
    /*==============トータル収支============== */
  }
  const totalProfit = records.reduce((sum, r) => sum + (r.buyOut - r.buyIn), 0);
  {
    /*=============トータル賞金=============== */
  }
  const totalPrize = records.reduce((sum, r) => sum + r.buyOut, 0);
  {
    /*=============最大賞金=========== */
  }
  const maxPrize = records.reduce((max, r) => Math.max(max, r.buyOut), 0);
  {
    /*=============平均buy-in=========== */
  }
  const totalBuyIn = records.reduce((sum, r) => sum + r.buyIn, 0);
  const averageBuyIn =
    records.length === 0 ? 0 : Math.round(totalBuyIn / records.length);
  {
    /*=============インマネ率=========== */
  }
  const itmCount = records.filter((r) => r.buyOut > 0).length;
  const itmRate =
    records.length === 0
      ? "0.0"
      : ((itmCount / records.length) * 100).toFixed(1);
  {
    /*=============ROI=========== */
  }
  const ROI =
    totalBuyIn === 0
      ? "0.0"
      : (((totalPrize - totalBuyIn) / totalBuyIn) * 100).toFixed(1);

  {
    /* ==============入力フォーム==============*/
  }
  type FormValues = {
    date: string;
    name: string;
    buyIn: string;
    buyOut: string;
  };
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit = (values: FormValues) => {
    const buyInNum = Number(values.buyIn);
    const buyOutNum = Number(values.buyOut);
    const date = values.date.trim();
    const name = values.name.trim();
    if (!date || !name) return;
    if (Number.isNaN(buyInNum) || Number.isNaN(buyOutNum)) return;

    const newRecords: RecordItems = {
      id: crypto.randomUUID(),
      date: values.date,
      name: values.name,
      buyIn: buyInNum,
      buyOut: buyOutNum,
    };
    setRecords((prev) => {
      const newData = [newRecords, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });

    reset();
  };

  return (
    <div className="">
      <h1 className="flex items-center justify-center p-4 text-2xl border-b">
        ポーカー収支管理アプリ
      </h1>
      <div className="grid grid-cols-2">
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>トータル収支</p>
          <p
            className={`${
              totalProfit > 0
                ? "text-green-500"
                : totalProfit < 0
                  ? "text-red-500"
                  : "text-black"
            }`}
          >
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit} USD
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
            <p>インマネ率</p>
            <p>{itmRate}%</p>
          </div>
          <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
            <p>ROI</p>
            <p>{ROI}%</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>トータル賞金</p>
          <p className="text-yellow-600">${totalPrize}</p>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>最大賞金</p>
          <p className="text-yellow-600">${maxPrize}</p>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>平均buy-in</p>
          <p>${averageBuyIn}</p>
        </div>
      </div>
      {/* ==============新規登録フォーム============== */}
      <div>
        <div className="border-b p-4">＋新規登録</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-left p-2">日付</p>
          <input
            type="date"
            className="text-left ring rounded-xl p-2 min-w-full"
            {...register("date")}
          />
          <p className="text-left p-2">トーナメント名</p>
          <input
            className="text-left ring rounded-xl p-2 min-w-full"
            {...register("name")}
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="text-left">
              <p className="text-left p-2">Buy-in (USD)</p>
              <input
                type="number"
                className="text-left ring rounded-xl p-2 min-w-full"
                {...register("buyIn")}
              />
            </div>
            <div className="text-left">
              <p className="text-left p-2">Buy-out (USD)</p>
              <input
                type="number"
                className="text-left ring rounded-xl p-2 min-w-full"
                {...register("buyOut")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="ring rounded-xl min-w-full p-2 mt-4 bg-green-300"
          >
            登録する
          </button>
        </form>
      </div>
      {/* ==============履歴一覧==============*/}
      <div>
        <div className="border-b p-4">履歴一覧</div>
        {recordList}
      </div>
    </div>
  );
}

export default App;
