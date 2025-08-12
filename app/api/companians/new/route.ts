import dbConnect from "@/app/libs/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import companian from "@/app/models/companian";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const {userId}=await auth()
     const newCompanion = await companian.create({
      ...body,
      author: userId, // attach Clerk userId here
    });
    return NextResponse.json({ status: 201,companion:newCompanion });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
