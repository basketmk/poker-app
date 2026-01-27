import { useState } from "react";
import "./App.css";
import { RecordList } from "./components/RecordList";
import { Summary } from "./components/Summary";
import type { RecordItems, HandItem } from "./types/type";
import { RecordForm } from "./components/RecordForm";
import { CashFlowChart } from "./components/CashFlowChart";
import { HandHistory } from "./components/HandHistory";

function App() {
  const STORAGE_KEY = "poker_record";
  const HAND_STORAGE_KEY = "poker_hand_record";

  //==============トーナメント履歴削除用関数==============
  const handleDelete = (record: RecordItems) => {
    if (!confirm(`${record.name} を削除しますか？`)) return;

    setRecords((prev) => {
      const newItems = prev.filter((r) => r.id !== record.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });

    setHands((prev) => {
      const newHands = prev.filter((h) => h.tournamentId !== record.id);
      localStorage.setItem(HAND_STORAGE_KEY, JSON.stringify(newHands));
      return newHands;
    });
  };

  //==============トーナメント履歴==============
  const [records, setRecords] = useState<RecordItems[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecordItems[];
  });

  //==============トーナメント履歴追加関数==============
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
  type Screen = "tmList" | "form" | "chart" | "home" | "hand";
  const [screen, setScreen] = useState<Screen>("home");

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

  //==============円表示==============
  const [isJPY, setIsJPY] = useState<true | false>(false);
  const USD_to_JPY = 158.5;

  const exchangeMoney = (USD: number) => {
    const isMinus = USD < 0;
    const n = Math.abs(USD);
    if (isJPY) {
      const JPY = Math.round(n * USD_to_JPY);
      return isMinus ? `-￥${JPY}` : `￥${JPY}`;
    }
    return isMinus ? `-$${n}` : `$${n}`;
  };

  //==============ハンド履歴に用いる==============
  const [hands, setHands] = useState<HandItem[]>(() => {
    const stored = localStorage.getItem(HAND_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as HandItem[];
  });

  //==============ハンド追加関数==============
  const handleAddHand = (newHand: HandItem) => {
    setHands((prev) => {
      const newData = [newHand, ...prev];
      localStorage.setItem(HAND_STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  };

  //==============ハンド削除関数==============
  const handleDeleteHand = (hand: HandItem) => {
    if (!confirm("ハンドを削除しますか？")) return;
    setHands((prev) => {
      const newHands = prev.filter((h) => h.id !== hand.id);
      localStorage.setItem(HAND_STORAGE_KEY, JSON.stringify(newHands));
      return newHands;
    });
  };

  return (
    <div className="h-[100vh]">
      <div className="h-[90vh]">
        <div className="mb-1 border-b">
          <h1 className="flex items-center justify-center text-xl">
            ポーカー収支管理アプリ
          </h1>
          <div className="flex items-center justify-end gap-1 text-sm">
            <p className="pb-1">円表示(USD/JPY {USD_to_JPY})</p>
            <input
              className="ml-1 w-3 h-3"
              type="checkbox"
              checked={isJPY}
              onChange={(e) => setIsJPY(e.target.checked)}
            ></input>
          </div>
        </div>
        {(screen === "home" || screen === "tmList" || screen === "form") && (
          <div>
            <div className="pb-1 pt-1 flex items-center justify-center">
              {periodLabel}
            </div>
            <Summary records={filteredRecords} exchange={exchangeMoney} />

            <div>
              <div className="grid grid-cols-2 m-2">
                <button
                  onClick={() => {
                    setScreen("tmList");
                    setSelectedYear(null);
                    setSelectedMonth(null);
                    setSelectedDay(null);
                  }}
                  className="border-b p-4 mt-3 min-w-full cursor-pointer"
                >
                  履歴一覧
                </button>
                <button
                  onClick={() => {
                    setScreen("form");
                  }}
                  className="border-b p-4 mt-3 min-w-full cursor-pointer"
                >
                  ＋新規登録
                </button>
              </div>
            </div>
          </div>
        )}
        <div>
          {/* ==============履歴一覧============== */}
          {/* ===年月別フィルタリング=== */}
          {(screen === "home" || screen === "tmList" || screen === "chart") && (
            <div className="flex min-h-[11vh]">
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
                        <div key={day}>
                          <button
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
            </div>
          )}
          {/* ===履歴詳細=== */}
          {(screen === "home" || screen === "tmList") && (
            <div className="h-[40vh] overflow-y-auto overscroll-contain p-3">
              <RecordList
                records={filteredRecords}
                onDelete={handleDelete}
                exchange={exchangeMoney}
              />
            </div>
          )}
          {/* ==============新規登録フォーム============== */}
          <div>
            {screen === "form" && <RecordForm onAdd={handleAddRecord} />}
          </div>
          {/* ==============グラフ============== */}
          {screen === "chart" && (
            <CashFlowChart
              records={filteredRecords}
              periodLabel={periodLabel}
            />
          )}
          {/* ==============ハンド履歴============== */}
          {screen === "hand" && (
            <HandHistory
              tournaments={filteredRecords}
              onAddHand={handleAddHand}
              hands={hands}
              onDeleteHand={handleDeleteHand}
            />
          )}
        </div>
      </div>
      {/* ==============画面下部ボタン============== */}
      <div className="border-t p-3 grid grid-cols-3">
        <button
          onClick={() => {
            setScreen("chart");
          }}
          className={`cursor-pointer ${screen === "chart" && "text-green-500"}`}
        >
          グラフ
        </button>
        <button
          className={`cursor-pointer ${screen === "home" && "text-green-500"}`}
          onClick={() => {
            setScreen("home");
            setSelectedYear(null);
            setSelectedMonth(null);
            setSelectedDay(null);
          }}
        >
          ホーム
        </button>
        <button
          className={`cursor-pointer ${screen === "hand" && "text-green-500"}`}
          onClick={() => setScreen("hand")}
        >
          ハンド履歴
        </button>
      </div>
    </div>
  );
}

export default App;
