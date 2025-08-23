"use server";

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
      companian_id: id,
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
      _id: { $in: companionIds },
    });
    console.log(companions);
    return companions; // Return the detailed companion data
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}

export async function GetuserCompanian() {
  await dbConnect();
  try {
    const { userId } = await auth();
    const allSessions = await CompanianModel.find({ author: userId });
    return allSessions;
  } catch (error) {
    return error;
  }
}

export const CompanionPermission = async () => {
  await dbConnect();
  const { userId, has } = await auth();

  if (!userId) {
    // User not logged in
    return false;
  }

  // Default free plan limit (if no plan found)
  let limit = 0;

  try {
    if (has({ plan: "pro" })) {
      return true; // Unlimited
    } else if (has({ plan: "basic_plan" })) {
      limit = 3;
    } else if (has({ plan: "students" })) {
      limit = 10;
    }

    const companionCount = await CompanianModel.countDocuments({ author: userId });

    
    return companionCount < limit;
  } catch (error: any) {
    console.error("Error checking companion permission:", error);
    return false; // Fail-safe: deny access if something goes wrong
  }
};

