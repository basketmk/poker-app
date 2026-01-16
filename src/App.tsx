import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const dummyRecords = [
    {
      id: "1",
      date: "2026/1/16",
      name: "Daily $50 NLH",
      buyIn: 50,
      buyOut: 320,
    },
    {
      id: "2",
      date: "2026/1/16",
      name: "Weekly $100 Tournament",
      buyIn: 100,
      buyOut: -100,
    },
  ];

  const Record = (props) => {
    return (
      <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
        <p className="text-sm">{props.date}</p>
        <p>{props.name}</p>
        <div className="grid grid-cols-3">
          <div className="text-left text-sm">
            <p>Buy-in: ${props.buyIn}</p>
          </div>
          <div className="text-left text-sm">
            <p>Buy-out: ${props.buyOut}</p>
          </div>
          <div className="text-left text-sm">
            <p>収支: +270</p>
          </div>
        </div>
      </div>
    );
  };

  const recordList = dummyRecords.map((record) => {
    return (
      <Record
        key={record.id}
        data={record.date}
        name={record.name}
        buyIn={record.buyIn}
        buyOut={record.buyOut}
      />
    );
  });

  return (
    <div className="">
      <h1 className="flex items-center justify-center p-4 text-2xl border-b">
        ポーカー収支管理アプリ
      </h1>
      <div className="grid grid-cols-2">
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>トータル収支</p>
          <p>+3500 USD</p>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>インマネ率</p>
          <p>20%</p>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>トータル賞金</p>
          <p>$10,000 USD</p>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>最大賞金</p>
          <p>$25,000</p>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p>平均buy-in</p>
          <p>$300</p>
        </div>
      </div>
      <div>
        <div className="border-b p-4">＋新規登録</div>
        <div>
          <p className="text-left p-2">日付</p>
          <p className="text-left ring rounded-xl p-2 ">2026/01/16</p>
          <p className="text-left p-2">トーナメント名</p>
          <p className="text-left ring rounded-xl p-2 ">Daily $50 NLH</p>
          <div className="grid grid-cols-2">
            <div className="text-left p-2">
              <p className="text-left p-2">Buy-in (USD)</p>
              <p className="text-left ring rounded-xl p-2 ">550</p>
            </div>
            <div className="text-left p-2">
              <p className="text-left p-2">Buy-out (USD)</p>
              <p className="text-left ring rounded-xl p-2 ">6700</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="border-b p-4">履歴一覧</div>
        {recordList}
      </div>
    </div>
  );
}

export default App;
