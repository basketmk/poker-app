type Props = {
  id: string;
  date: string;
  name: string;
  buyIn: number;
  buyOut: number;
  onDelete: () => void;
};

{
  /* ==============履歴一覧用==============*/
}
export const RecordItem = (props: Props) => {
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
