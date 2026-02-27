import connectDB from "@/src/lib/mongodb";
import Admin from "@/src/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB();
    try{
        const body =await req.json();
        const {email,password} = body;

        if(!email || !password){
            return NextResponse.json({error:"Email and password are required"},{status:400});
        }

        const user = await Admin.findOne({email});

        if(!user){
            return NextResponse.json({error:"Invalid email or password"},{status:401});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return NextResponse.json({error:"Invalid email or password"},{status:401});
        }

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET, {expiresIn:"1h"})

        const response = NextResponse.json({message:"Login successful",token,user:{email:user.email,name:user.name}});

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });

        return response;

    }catch(error){
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500});
    }
}