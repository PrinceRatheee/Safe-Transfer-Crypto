"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
// import { Line } from " react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { chartDays } from "../config/data";
import { HistoricalChart } from "../config/api";

const ChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey="prices"
          stroke="#14ffec"
          strokeWidth={"1px"}
          dot={false}
        />
        <XAxis dataKey="date" />
        <YAxis dataKey="prices" domain={["auto", "auto"]} />
        <Tooltip cursor={false} />
        {/* <CartesianGrid stroke="#ccc" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartTable = ({ coinId },{coinPrice}) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(15);
  const currency = "usd";
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coinId, days, currency));
      console.log("chart data", data);
      setflag(true);
      console.log(data);
      let convertedData = data.prices.map((item) => {
        return {
          date: new Date(item[0]).toLocaleDateString,
          prices: item[1],
        };
      });
      setHistoricData(convertedData);
      console.log("coin Price",coinPrice);
      console.log("hist");
    } catch (error) {
      console.log("error chart");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days, coinId]);

  // console.log(coin);
  return (
    // <div className="w-[100%] flex flex-col items-center justify-center mt-[25px] p-[40px]">
    //   {!historicData ? (
    //     <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
    //   ) : (
    //     <>
    //       <Line
    //         data={{
    //           labels: historicData.map((coin) => {
    //             let date = new Date(coin[0]);

    //             let time =
    //               date.getHours() > 12
    //                 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
    //                 : `${date.getHours()}:${date.getMinutes()} AM`;

    //             return days === 1 ? time : date.toLocaleDateString();
    //           }),

    //           datasets: [{
    //             data: historicData.map((coin) => coin[1]) ,
    //             label:`Price (Past ${days} Days) in ${currency}`,
    //             borderColor:"#EEBC1D"
    //           }],
    //         }}
    //       />
    //     </>
    //   )}
    // </div>
    <>
    <div className="w-[90vw] h-[90vh] flex flex-col container justify-center">
      <ChartComponent data={historicData} />
      <div>
        <h3 className="text-center">Timeframe</h3>
      </div>
      <div className="w-[60%] flex justify-around self-center">
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 1 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(1)}
        >
          1 Day
        </button>
        <button
          select
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 15 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(15)}
        >
          15 Day
        </button>
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 30 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(30)}
        >
          30 Day
        </button>
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 365 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(365)}
        >
          1 Year
        </button>
      </div>
    </div>
      
    </>
  );
};

export default ChartTable;
