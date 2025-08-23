// import { auth } from "@clerk/nextjs/server";
import CompanianModel from "../models/companian";
import Session_Model from "../models/session_history";
import dbConnect from "./db";

interface IallCompanion {
  page?: number;
  limit?: number;
  topic?: string | string[];
  subject?: string | string[];
}

export async function getAllCompanion({
  page = 1,
  limit = 10,
  subject,
  topic,
}: IallCompanion) {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
  }
  let Companion = await CompanianModel.find({});
  if (topic && subject) {
    Companion = await CompanianModel.find({
      $or: [{ subject: subject }, { topic: topic }],
    });
  }

  try {
    return Companion;
  } catch (error) {
    console.log(error);
  }
}

export async function getAcompanian(id: string) {
  try {
    await dbConnect();
    const companian = await CompanianModel.findById(id); // or findOne({ id })
    return companian;
  } catch (error) {
    console.error("Error fetching companian:", error);
    return null;
  }
}
export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
  selfimprovement: "#A7F3D0", // calm green tone for growth
};
export const getSubjectColor = (subject: string) => {
  subject = subject.toLowerCase();
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectImage = {
  maths: "/maths.png",
  language: "/language.png",
  science: "/science.png",
  history: "/history.png",
  coding: "/coding.png",
  economics: "/economics.png",
};
