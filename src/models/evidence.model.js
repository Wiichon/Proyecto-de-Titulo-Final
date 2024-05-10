import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    origin:{
      type:String,
      required:true
    },
    quantity:{
      type:Number,
      required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taskId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Task",
    },
    

  },
  {
    timestamps: true,
  });

export default mongoose.model("Evidence", evidenceSchema);

