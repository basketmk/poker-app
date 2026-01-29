import type { HandFormValue } from "../types/type";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (value: HandFormValue) => void;
};

export const HandForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HandFormValue>({
    defaultValues: {
      heroPos: "",
      heroHand: "",
      villainPos: "",
      villainHand: "",
      memo: "",
      preflop: "",
      flop: "",
      turn: "",
      river: "",
      blindSB: undefined,
      blindBB: undefined,
      stack: undefined,
    },
  });

  const position: string[] = [
    "",
    "UTG",
    "UTG+1",
    "MP",
    "MP+1",
    "HJ",
    "CO",
    "BTN",
    "SB",
    "BB",
  ];

  const submit = (value: HandFormValue) => {
    onSubmit(value);
    reset();
  };
  return (
    <form className="p-3" onSubmit={handleSubmit(submit)}>
      <div className="mb-3">ハンド新規作成フォーム</div>
      <div className="flex items-center items-left w-full gap-5 h-12 mb-5">
        <div className="w-[28%]">
          <div>(blind)</div>
          <div className="flex gap-2">
            <div className="flex items-center justify-center">SB</div>
            <div>
              <input
                className="border rounded-xl w-full p-2"
                type="number"
                placeholder="例) 600"
                {...register("blindSB", {
                  valueAsNumber: true,
                  required: "入力してください",
                })}
              />
              {errors.blindSB && (
                <p className="text-xs text-red-500">{errors.blindSB.message}</p>
              )}
            </div>
            <div className="flex items-center justify-center">BB</div>
            <div>
              <input
                className="border rounded-xl w-full p-2"
                type="number"
                placeholder="例) 1200"
                {...register("blindBB", {
                  valueAsNumber: true,
                  required: "入力してください",
                })}
              />
              {errors.blindBB && (
                <p className="text-xs text-red-500">{errors.blindBB.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[15%]">
          <div>(myStack)</div>
          <input
            className="border rounded-xl w-full p-2"
            placeholder="例) 65000"
            type="number"
            {...register("stack")}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="gap-3 grid grid-cols-5">
          <div>
            <div>(Heroポジション)</div>
            <select
              className="border w-full h-9 pl-2 rounded-xl"
              {...register("heroPos")}
            >
              {position.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <div>(Heroハンド)</div>
            <input
              className="border w-full p-2 h-9 rounded-xl"
              type="text"
              maxLength={4}
              placeholder="例) AhQh"
              {...register("heroHand", {
                minLength: {
                  value: 4,
                  message: "ハンドは4文字(2枚)で入力してください",
                },
              })}
            />
            {errors.heroHand && (
              <p className="text-xs text-red-500">{errors.heroHand.message}</p>
            )}
          </div>
          <div className="text-red-500 flex items-center justify-center">
            V S
          </div>
          <div>
            <div>(Villainポジション)</div>
            <select
              className="border w-full h-9 pl-2 rounded-xl flex items-center justify-center"
              {...register("villainPos")}
            >
              {position.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <div>(villainハンド)</div>
            <input
              className="border w-full h-9 p-3 rounded-xl flex items-center justify-center"
              type="text"
              maxLength={4}
              placeholder="例) ThTs"
              {...register("villainHand")}
            />
          </div>
        </div>
      </div>
      <div className="flex grid grid-cols-3 mt-3">
        <div>
          <div>(Flop)</div>
          <input
            className="border rounded-xl h-9 p-3"
            type="text"
            placeholder="例) KsJsJd"
            {...register("flop", {
              maxLength: { value: 6, message: "Flopは6文字(3枚)までです" },
            })}
          />
          {errors.flop && (
            <p className="text-sm text-red-500">{errors.flop.message}</p>
          )}
        </div>
        <div>
          <div>(Turn)</div>
          <input
            className="border rounded-xl h-9 p-3"
            type="text"
            placeholder="例) 3h"
            {...register("turn", {
              maxLength: { value: 2, message: "Turnは2文字(1枚)までです" },
            })}
          />
          {errors.turn && (
            <p className="text-sm text-red-500">{errors.turn.message}</p>
          )}
        </div>

        <div>
          <div>(River)</div>
          <input
            className="border rounded-xl h-9 p-3"
            type="text"
            placeholder="例) 9h"
            {...register("river", {
              maxLength: { value: 2, message: "Riverは2文字(1枚)までです" },
            })}
          />
          {errors.river && (
            <p className="text-sm text-red-500">{errors.river.message}</p>
          )}
        </div>
      </div>
      <div>
        <div className="text-left mt-3 text-break p-2">メモ（任意）</div>
        <textarea
          className="items-left w-full border rounded-xl p-2"
          rows={4}
          {...register("memo")}
        />
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
