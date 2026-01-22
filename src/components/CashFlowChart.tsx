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
  return (
    <div className="h-[45vh]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Line dataKey="buyOut" />
          <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
