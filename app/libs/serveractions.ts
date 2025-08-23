"use server"

import { auth } from "@clerk/nextjs/server";
import dbConnect from "./db";
import Session_Model from "../models/session_history";
import CompanianModel from "../models/companian";

export async function addtoHistory(id: string) {
  await dbConnect();
  const { userId } = await auth();

  try {
    const session = await Session_Model.create({
      user_id: userId,
      companian_id: id
    });
    await session.save();
  } catch (error) {
    console.error("Error adding to history:", error);
  }
}

export async function GetHistory() {
  await dbConnect();
  const { userId } = await auth();

  try {
    // 1. Get the user's history records
    const history = await Session_Model.find({ user_id: userId });

    // 2. Extract all companion IDs from the history
    const companionIds = history.map((item) => item.companian_id);

    // 3. Fetch companion details for those IDs
    const companions = await CompanianModel.find({
      _id: { $in: companionIds }
    });

    return companions; // Return the detailed companion data
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
