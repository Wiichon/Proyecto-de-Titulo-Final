import mongoose from "mongoose";



const imageSchema = new mongoose.Schema({
    
    imageUrls: [String], // Un array de URLs de imágenes
});



export default mongoose.model("Image", imageSchema); 