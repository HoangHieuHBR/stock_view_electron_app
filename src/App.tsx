import { useState, FC } from "react";

import Chart from "react-apexcharts";
import useAlphaVantage from "./useAlphaVantage";

import { symbols } from "./config";

import "./App.css";

const App: FC = () => {
  const [symbol, setSymbol] = useState("IBM");

  const dataAlpha = useAlphaVantage(symbol);

  if (!dataAlpha) return <div className="loading">Loading...</div>;

  const state = {
    series: [
      {
        data: dataAlpha,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "Candlestick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  } as {
    series: { data: any }[];
    options: Chart["props"]["options"];
  };

  return (
    <div>
      <div>
        <select
          className="select"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <Chart
        options={state.options}
        series={state.series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default App;
