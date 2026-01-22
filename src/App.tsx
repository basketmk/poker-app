import { useState } from "react";
import "./App.css";
import { RecordList } from "./components/RecordList";
import { Summary } from "./components/Summary";
import type { RecordItems } from "./types/type";
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
    setScreen("tmList");
  };

  //==============Stateで画面遷移==============
  type Screen = "tmList" | "form" | "chart";
  const [screen, setScreen] = useState<Screen>("tmList");

  //==============期間別フィルタリング==============
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getYear = (date: string) => Number(date.slice(0, 4));
  const getMonth = (date: string) => Number(date.slice(5, 7));
  const getDay = (date: string) => Number(date.slice(8, 10));

  const years = Array.from(
    new Set(records.map((record) => getYear(record.date))),
  ).sort((a, b) => b - a);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days =
    selectedYear !== null && selectedMonth !== null
      ? Array.from(
          new Set(
            records
              .filter(
                (record) =>
                  getYear(record.date) === selectedYear &&
                  getMonth(record.date) === selectedMonth,
              )
              .map((record) => getDay(record.date)),
          ),
        ).sort((a, b) => a - b)
      : [];

  const filteredRecords = records.filter((record) => {
    const year = getYear(record.date);
    const month = getMonth(record.date);
    const day = getDay(record.date);

    if (selectedYear !== null && year !== selectedYear) return false;
    if (selectedMonth !== null && month !== selectedMonth) return false;
    if (selectedDay !== null && day !== selectedDay) return false;

    return true;
  });

  const periodLabel =
    selectedYear === null
      ? "全期間"
      : selectedMonth === null
        ? `${selectedYear}年`
        : selectedDay === null
          ? `${selectedYear}年${selectedMonth}月`
          : `${selectedYear}年${selectedMonth}月${selectedDay}日`;

  return (
    <div className="h-screen p-3">
      <h1 className="flex items-center justify-center p-4 mb-1 text-3xl border-b">
        ポーカー収支管理アプリ
      </h1>
      <div className="pb-2 pt-3 flex items-center justify-center">
        {periodLabel}
      </div>
      <Summary records={filteredRecords} />
      <div>
        <div className="grid grid-cols-3 m-2">
          <button
            onClick={() => {
              setScreen("tmList");
              setSelectedYear(null);
              setSelectedMonth(null);
              setSelectedDay(null);
            }}
            className="border-b p-4 min-w-full cursor-pointer"
          >
            履歴一覧
          </button>
          <button
            onClick={() => {
              setScreen("form");
            }}
            className="border-b p-4 min-w-full cursor-pointer"
          >
            ＋新規登録
          </button>
          <button
            onClick={() => {
              setScreen("chart");
            }}
            className="border-b p-4 min-w-full cursor-pointer"
          >
            グラフ
          </button>
        </div>
      </div>
      <div>
        {/* ==============履歴一覧============== */}
        {/* ===年月別フィルタリング=== */}
        <div className="flex">
          {screen === "tmList" && (
            <div>
              <div className="flex">
                <button
                  className={`items-left border rounded text-sm p-0.5 m-0.5 cursor-pointer ${selectedYear === null && selectedMonth === null ? "bg-gray-300" : ""}`}
                  onClick={() => {
                    setSelectedYear(null);
                    setSelectedMonth(null);
                    setSelectedDay(null);
                  }}
                >
                  全期間
                </button>

                <div className="flex">
                  {years.map((year) => {
                    return (
                      <button
                        key={year}
                        className={`border rounded flex items-left text-sm p-0.5 m-0.5 cursor-pointer ${selectedYear === year ? "bg-gray-300" : ""}`}
                        onClick={() => {
                          setSelectedYear(year);
                          setSelectedMonth(null);
                          setSelectedDay(null);
                        }}
                      >
                        {year}年
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex">
                {selectedYear !== null &&
                  months.map((month) => {
                    return (
                      <button
                        key={month}
                        className={`border rounded flex items-left text-sm p-0.5 m-0.5 cursor-pointer ${selectedMonth === month ? "bg-gray-300" : ""}`}
                        onClick={() => {
                          setSelectedMonth(month);
                          setSelectedDay(null);
                        }}
                      >
                        {month}月
                      </button>
                    );
                  })}
              </div>
              <div className="flex">
                {selectedMonth !== null &&
                  days.map((day) => {
                    return (
                      <div>
                        <button
                          key={day}
                          className={`border rounded flex items-left text-sm p-0.5 m-0.5 cursor-pointer ${selectedDay === day ? "bg-gray-300" : ""}`}
                          onClick={() => setSelectedDay(day)}
                        >
                          {day}日
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        {/* ===履歴詳細=== */}
        <div>
          {screen === "tmList" && (
            <div className="h-[45vh] overflow-y-auto overscroll-contain p-3">
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
