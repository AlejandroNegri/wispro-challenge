import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

export default function UsersAccessGraph(props) {
  const createGraphicData = () => {
    let data = [];
    let accessData = props.user.lastAccess;

    for (var i = 0; i < accessData.length; i++) {
      data.push({
        name: moment()
          .add(i - accessData.length, "days")
          .format("DD/MM/YY"),
        uv: accessData[i],
        pv: 2400,
        amt: 2400,
      });
    }

    return (
      <ResponsiveContainer width="99%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return createGraphicData();
}
