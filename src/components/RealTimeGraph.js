import React from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import _ from "lodash";

export default function RealTimeGraph(props) {
  let graphData = useSelector((state) => state.app.graphData);

  const createGraphicData = () => {
    let data = [];
    let lastGraphData = _.takeRight(graphData, 5);

    lastGraphData.forEach((element) => {
      let value = 0;

      switch (props.type) {
        case "%CPU":
          value = element.cpuUsage;
          break;
        case "RAM":
          value = element.ramUsage;
          break;
        case "USO DE INTERNET":
          value = element.netUsage;
          break;
        default:
          value = 0;
          break;
      }

      data.push({
        uv: value,
        pv: 2400,
        amt: 2400,
      });
    });

    return (
      <div className="graphics-area">
        <label className="graphics-label">{props.type}</label>
        <ResponsiveContainer width="99%" height={200}>
          <AreaChart
            width={60}
            height={30}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return createGraphicData();
}
