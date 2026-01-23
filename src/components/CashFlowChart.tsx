import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { RecordItems } from "../types/type";

type Props = {
  records: RecordItems[];
  periodLabel: string;
};

export const CashFlowChart = ({ records, periodLabel }: Props) => {
  const sortedData = [...records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  type ChartData = {
    date: string;
    name: string;
    cumProfit: number;
  };

  const cumulativeData: ChartData[] = sortedData.reduce<ChartData[]>(
    (sum, r) => {
      const profit = r.buyOut - r.buyIn;
      const prevTotalProfit =
        sum.length === 0 ? 0 : sum[sum.length - 1].cumProfit;
      const cumProfit = prevTotalProfit + profit;

      sum.push({
        date: r.date,
        name: r.name,
        cumProfit: cumProfit,
      });
      return sum;
    },
    [],
  );

  const maxCumProfit = Math.max(...cumulativeData.map((c) => c.cumProfit));

  return (
    <div className="h-[40vh] w-full">
      <div>{periodLabel}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={cumulativeData}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Line dataKey={"cumProfit"} name="累計収支(USD)" />
          <YAxis domain={[-maxCumProfit - 10, maxCumProfit + 10]} />
          <Legend />
          <Tooltip contentStyle={{ fontSize: "12px" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
