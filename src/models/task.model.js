import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
      comuna: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      datefinal: {
        type: Date,
        default: Date.now,
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      evidences:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Evidence",
        }
      ]

    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("Task", taskSchema);
  