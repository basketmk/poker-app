import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { RecordList } from "./components/RecordList";
import { Summary } from "./components/Summary";
import type { RecordItems } from "./types/type";
import type { FormValues } from "./types/type";

function App() {
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

  const STORAGE_KEY = "poker_record";
  const [records, setRecords] = useState<RecordItems[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecordItems[];
  });

  {
    /* ==============入力フォーム==============*/
  }
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

  {
    /* ==============Stateで画面遷移==============*/
  }
  const [screen, setScreen] = useState("tmList");
  const setFormScreen = () => {
    setScreen("form");
  };
  const setTmListScreen = () => {
    setScreen("tmList");
  };

  return (
    <div className="">
      <h1 className="flex items-center justify-center p-4 text-2xl border-b">
        ポーカー収支管理アプリ
      </h1>
      <Summary records={records} />
      <div>
        <div className="grid grid-cols-2 m-2">
          <button
            onClick={setTmListScreen}
            className="border-b p-4 min-w-full cursor-pointer"
          >
            履歴一覧
          </button>
          <button
            onClick={setFormScreen}
            className="border-b p-4 min-w-full cursor-pointer"
          >
            ＋新規登録
          </button>
        </div>
      </div>
      <div>
        {/* ==============履歴一覧============== */}
        <div>
          {screen === "tmList" && (
            <>
              <RecordList records={records} onDelete={handleDelete} />
            </>
          )}
        </div>
        {/* ==============新規登録フォーム============== */}
        <div>
          {screen === "form" && (
            <form onSubmit={handleSubmit(onSubmit)} className="">
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
          )}
        </div>
        {/* ==============履歴一覧==============*/}
      </div>
    </div>
  );
}

export default App;
