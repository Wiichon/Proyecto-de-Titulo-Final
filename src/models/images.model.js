import mongoose from "mongoose";



const imageSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
      },
    evidenceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Evidence",
      },
    imageUrls: [String], // Un array de URLs de imágenes
});



export default mongoose.model("Image", imageSchema); 