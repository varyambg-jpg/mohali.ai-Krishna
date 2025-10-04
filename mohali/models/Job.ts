import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  contactEmail: String,
  contactPhone: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
