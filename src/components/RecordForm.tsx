import type { RecordItems, FormValues } from "../types/type";
import { useForm } from "react-hook-form";

// ==============入力フォーム==============
type Props = { onAdd: (newRecord: RecordItems) => void };

export const RecordForm = ({ onAdd }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      date: new Date().toLocaleDateString("ja-JP"),
      name: "",
      buyIn: "",
      buyOut: "",
    },
  });
  const onSubmit = (values: FormValues) => {
    const buyInNum = Number(values.buyIn);
    const buyOutNum = Number(values.buyOut);
    const date = values.date.trim();
    const name = values.name.trim();
    if (!date || !name) return;
    if (Number.isNaN(buyInNum) || Number.isNaN(buyOutNum)) return;

    const newRecord: RecordItems = {
      id: crypto.randomUUID(),
      date: date,
      name: name,
      buyIn: buyInNum,
      buyOut: buyOutNum,
    };
    onAdd(newRecord);
    reset();
  };

  return (
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
        className="ring rounded-xl min-w-full p-2 mt-4 bg-green-300 cursor-pointer"
      >
        登録する
      </button>
    </form>
  );
};
