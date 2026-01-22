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

  //==============履歴削除用関数==============
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

  //==============Stateで画面遷移==============
  type Screen = "tmList" | "form";
  const [screen, setScreen] = useState<Screen>("tmList");
  const setFormScreen = () => {
    setScreen("form");
  };
  const setTmListScreen = () => {
    setScreen("tmList");
  };

  //==============期間別フィルタリング==============
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const getYear = (date: string) => Number(date.slice(0, 4));
  const getMonth = (date: string) => Number(date.slice(5, 7));

  const years = Array.from(
    new Set(records.map((record) => getYear(record.date))),
  ).sort((a, b) => b - a);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const filteredRecords = records.filter((record) => {
    const year = getYear(record.date);
    const month = getMonth(record.date);

    if (selectedYear !== null && year !== selectedYear) return false;
    if (selectedMonth !== null && month !== selectedMonth) return false;

    return true;
  });

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
        {/* ===年月別フィルタリング=== */}
        <div className="">
          {screen === "tmList" && (
            <>
              <div className="flex">
                {years.map((year) => {
                  return (
                    <button
                      key={year}
                      className={`border rounded flex items-left text-sm p-0.5 m-0.5 cursor-pointer ${selectedYear === year ? "bg-gray-300" : ""}`}
                      onClick={() => {
                        setSelectedYear(year);
                        setSelectedMonth(null);
                      }}
                    >
                      {year}年
                    </button>
                  );
                })}
              </div>
              <div className="flex">
                {selectedYear !== null &&
                  months.map((month) => {
                    return (
                      <button
                        key={month}
                        className={`border rounded flex items-left text-sm p-0.5 m-0.5 cursor-pointer ${selectedMonth === month ? "bg-gray-300" : ""}`}
                        onClick={() => setSelectedMonth(month)}
                      >
                        {month}月
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </div>
        {/* ===履歴詳細=== */}
        <div>
          {screen === "tmList" && (
            <div>
              <RecordList records={filteredRecords} onDelete={handleDelete} />
            </div>
          )}
        </div>
        {/* ==============新規登録フォーム============== */}
        <div>{screen === "form" && <RecordForm onAdd={handleAddRecord} />}</div>
      </div>
    </div>
  );
}

export default App;
