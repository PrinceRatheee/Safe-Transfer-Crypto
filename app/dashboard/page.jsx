"use client";
import { useEffect, useState } from "react";
import { getDataFromToken } from "../../helpers/getDataFromToken";
import User from "../../models/user";
import { connect } from "../../utils/database";
import Cookie from "js-cookie";

connect();

const Page = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from cookies
        const userId = Cookie.get("token") || " ";
        console.log(userId, "gvv");

        // Use your helper function to decode the token and get the user ID
        const decodedUserId = getDataFromToken(userId);

        // Fetch user data based on the decoded user ID
        const user = await User.findOne({ _id: decodedUserId }).select("-password");
        
        setData(user);
      } catch (error) {
        console.log("dashboard", error);
      }
    };

    fetchData();
  }, []);

  return <div>{`${data._id}`}</div>;
};

export default Page;
