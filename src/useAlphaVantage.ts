import useSWR, { SWRResponse } from "swr";
import { fetcher } from "./axios";

interface Series {
  x: string;
  y: any[];
}

const useAlphaVantage = (symbol: String): Series[] | null => {
  const apiUrl = `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

  const seriesData: SWRResponse<any, any, any> = useSWR(apiUrl, fetcher, {
    refreshInterval: 20000,
  });

  if (seriesData.error) return null;

  console.log(seriesData.data);

  if (seriesData.data) {
    const data = seriesData.data["Time Series (Daily)"];

    if (!data) return null;

    const series: Series[] = Object.keys(data).map((key) => {
      const values: any[] = Object.values(data[key]);
      values.pop();
      return {
        x: key,
        y: values,
      };
    });
    return series;
  }
  return null;
};

export default useAlphaVantage;
