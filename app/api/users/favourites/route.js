import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import {connect} from "../../../../utils/database";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        
        console.log(reqBody.myProperty)
        const data =reqBody.myProperty;
        console.log(data)
        console.log("reached fa")
        
        const userId=await getDataFromToken(request);
        console.log(userId);
        const user=await User.findOne({_id:userId});
        console.log(user)
        const newFavouriteSchema={
            coinId:reqBody.myProperty
        }
        user.favourites.push(newFavouriteSchema);
        user.save();
        return NextResponse.json({status:200,message:"Added to favourites"})
    } catch (error) {
        console.log(error,"gxfdfuyi");
    }
}