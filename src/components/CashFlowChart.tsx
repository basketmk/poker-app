import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RecordItems } from "../types/type";

type Props = {
  records: RecordItems[];
};

export const CashFlowChart = ({ records }: Props) => {
  const sortedData = [...records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  type ChartData = {
    date: string;
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
        cumProfit: cumProfit,
      });
      return sum;
    },
    [],
  );

  return (
    <div className="h-[50vh] w-full">
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
          <Line dataKey={"cumProfit"} />
          <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
