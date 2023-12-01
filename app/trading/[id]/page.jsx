"use client";
import React, { useEffect, useState } from "react";
import { SingleCoin } from "../../../config/api";
import axios from "axios";

import ReactHtmlParser from "react-html-parser";
import ChartTable from "../../../components/ChartTable";
const page = ({ params }) => {
  const [coin, setCoin] = useState([]);
  const [buyNumber,setBuyNumber]=useState(" ");
  const [sellNumber,setSellNumber]=useState(" ");

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(params.id));
    setCoin(data);
    console.log(data);
    console.log("data");
    console.log(coin.name);
    console.log('coin');
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  
  return (
    <div>
      <img src={coin?.image?.large} alt={coin?.name} className="w-[8rem] mb-[10px]" />
      <h1>{coin.name}({coin.symbol})</h1>
      <h3> Ranking: {coin.market_cap_rank}</h3>
      <p>Current price: ${coin?.market_data?.current_price?.usd}</p>
      <p>{ReactHtmlParser(coin.description?.en.split(".")[0])}</p>
      <br />
     
      <ChartTable coinId={params.id} />

      <div className="flex justify-between">
        <div className="flex flex-col w-[25rem] mt-[10vh] container gap-[1.5rem]">
          <div>
            <h1 className="merriweather-font font-bold text-[2rem]">Buy</h1>
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Price
            </h2>
            <p >
              {` ${coin?.market_data?.current_price?.usd}  `}<span className="font-bold ml-2">USD</span>
            </p>
            
          </div>
          <div className="flex justify-between items-center">
            <h2 className="merriweather-font font-bold text-[1rem]">
            {`${params.id}`}
            </h2>
            <input
              type="number"
              className="border-2 border-zinc-300   px-[0.5rem] py-[0.6rem] "
              name={buyNumber}
              id="buynumber"
              onChange={(e)=>setBuyNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Total
            </h2>
            <p>
              {`${buyNumber*coin?.market_data?.current_price?.usd}`}<span className="font-bold ml-2">USD</span>
            </p>
            
          </div>
          <button
            className="px-12 py-2    bg-[#32d993] w-[100%] text-white rounded-sm items-center"
            
          >
            {`Buy ${params.id}`}
          </button>
        </div>
        <div className="flex flex-col w-[25rem] mt-[10vh] container gap-[1.5rem]">
          <div>
            <h1 className="merriweather-font font-bold text-[2rem]">Sell</h1>
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Price
            </h2>
            <p>
            {` ${coin?.market_data?.current_price?.usd}  `}<span className="font-bold ml-2">USD</span>
            </p>
            
          </div>
          <div className="flex justify-between items-center">
            <h2 className="merriweather-font font-bold text-[1rem]">
            {`${params.id}`}
            </h2>
            <input
              type="number"
              className="border-2 border-zinc-300   px-[0.5rem] py-[0.6rem] "
              name={sellNumber}
              id="sellNumber"
              onChange={(e)=>setSellNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Total
            </h2>
            <p>
              {`${sellNumber*coin?.market_data?.current_price?.usd}`}<span className="font-bold ml-2">USD</span>
            </p>
            
          </div>
          <button
            className="px-12 py-2   bg-[#f6465d] w-[100%] text-white rounded-sm items-center"
            
          >
            {`Sell ${params.id}`}
          </button>
        </div>
        
      </div>
    
    </div>
  );
};

export default page;
