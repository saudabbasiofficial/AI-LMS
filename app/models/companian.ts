import mongoose from "mongoose";

const CompanianSchema = new mongoose.Schema(
  {
    name: String,
    subject: String,
    topic: String,
    voice: String,
    style: String,
    language: String,
    author: String,
  },
  { timestamps: true }
);

// Check if the model already exists to prevent overwriting
const CompanianModel = mongoose.models.Companian || mongoose.model("Companian", CompanianSchema);

export default CompanianModel;
