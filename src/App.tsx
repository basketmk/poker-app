import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { RecordList } from "./components/RecordList";
import { Summary } from "./components/Summary";
import type { RecordItems } from "./types/type";
import type { FormValues } from "./types/type";
import { RecordForm } from "./components/RecordForm";

function App() {
  const STORAGE_KEY = "poker_record";
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

  const [records, setRecords] = useState<RecordItems[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecordItems[];
  });

  const handleAddRecord = (newRecord: RecordItems) => {
    setRecords((prev) => {
      const newData = [newRecord, ...prev].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
    setTmListScreen();
  };

  {
    /* ==============Stateで画面遷移==============*/
  }
  type Screen = "tmList" | "form";
  const [screen, setScreen] = useState<Screen>("tmList");
  const setFormScreen = () => {
    setScreen("form");
  };
  const setTmListScreen = () => {
    setScreen("tmList");
  };
  {
    /* ==============日付順にrecordsをソート==============*/
  }

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
        <div>{screen === "form" && <RecordForm onAdd={handleAddRecord} />}</div>
      </div>
    </div>
  );
}

export default App;
