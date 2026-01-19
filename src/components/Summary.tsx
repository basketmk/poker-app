import type { RecordItems } from "../types/type";

type Props = {
  records: RecordItems[];
};

export const Summary = ({ records }: Props) => {
  //==============トータル収支==============
  const totalProfit = records.reduce((sum, r) => sum + (r.buyOut - r.buyIn), 0);
  //=============トータル賞金===============
  const totalPrize = records.reduce((sum, r) => sum + r.buyOut, 0);
  //=============最大賞金===========
  const maxPrize = records.reduce((max, r) => Math.max(max, r.buyOut), 0);
  //=============平均buy-in=========== */
  const totalBuyIn = records.reduce((sum, r) => sum + r.buyIn, 0);
  const averageBuyIn =
    records.length === 0 ? 0 : Math.round(totalBuyIn / records.length);
  //=============トーナメント参加数===========
  const totalTmCount = records.length;
  //=============インマネ率===========
  const itmCount = records.filter((r) => r.buyOut > 0).length;
  const itmRate =
    records.length === 0 ? 0.0 : ((itmCount / totalTmCount) * 100).toFixed(1);
  //=============ROI===========
  const Roi =
    totalBuyIn === 0
      ? 0.0
      : (((totalPrize - totalBuyIn) / totalBuyIn) * 100).toFixed(1);

  return (
    <div>
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
            <div className="flex gap-2">
              <p className="text-cyan-700">{itmRate}%</p>
              <p className="text-sm flex items-center justify-center">
                ({itmCount} / {totalTmCount})
              </p>
            </div>
          </div>
          <div className="ring ring-zinc-900 rounded-xl mt-3 mr-3 p-4 text-left">
            <p>ROI</p>
            <p>{Roi}%</p>
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
    </div>
  );
};
