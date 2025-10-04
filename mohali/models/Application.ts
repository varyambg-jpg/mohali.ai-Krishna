import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job" },
  name: String,
  email: String,
  phone: String,
  cvUrl: String,
  disclaimer: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
