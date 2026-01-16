import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
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
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p className="text-sm">2026/1/16</p>
          <p>Daily $50 NLH</p>
          <div className="grid grid-cols-3">
            <div className="text-left text-sm">
              <p>Buy-in: $50</p>
            </div>
            <div className="text-left text-sm">
              <p>Buy-out: $320</p>
            </div>
            <div className="text-left text-sm">
              <p>収支: +270</p>
            </div>
          </div>
        </div>
        <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
          <p className="text-sm">2026/1/16</p>
          <p>Daily $50 NLH</p>
          <div className="grid grid-cols-3">
            <div className="text-left text-sm">
              <p>Buy-in: $50</p>
            </div>
            <div className="text-left text-sm">
              <p>Buy-out: $320</p>
            </div>
            <div className="text-left text-sm">
              <p>収支: +270</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
