"use client";
import React, { useState, useEffect,useLayoutEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";




export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const FavouriteCoins = ({data}) => {
  
  
  const favourites = async () => {
    try {
      

      // Assuming data is a string
      const dataObject = {
        myProperty: data
      };
  
      console.log(dataObject);
      console.log("hfghdftfff");
  
      const response = await axios.post("/api/users/favourites", dataObject);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.log("Error in adding favourites", error);
    }
  };

  
  

  return (
    <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
     
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#ef4444"
      className="w-6 h-6 "
      fill="none"
      onClick={
      
        favourites}

    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
    </>
  );
};

const CoinsTable = () => {
  const router = useRouter();
 

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const currency = "usd";
  const symbol = "$";
 
  

  

  

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  console.log("coins");
  console.log(coins);
  console.log("coins");

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  

  return (
    <>
      <Container>
        <h4 className="text-center m-[18px] merriweather-font">
          Cryptocurrencies
        </h4>

        <TextField
          label="Search here for crypto.."
          variant="outlined"
          className="mb-[20px] w-[100%]"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["", "Coin", "Price", "24h change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    // console.log("row id");
                    // console.log(row.id);
                    return (
                      <TableRow
                        onClick={() => router.push(`/trading/${row.id}`)}
                        className="row"
                        key={row.name}
                      >
                        <TableCell>
                          <FavouriteCoins data={row.id} />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="flex gap-[15px]"
                        >
                          <div className="flex flex-col">
                            <Link href={`/trading/${row.id}`}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                className="w-[3rem] mb-[10px]"
                              />
                            </Link>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                          </div>
                          <div
                            className="flex items-center"
                            // style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgba(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default CoinsTable;
