import { Router } from "express";
import { uploadImages,getImages, getImage } from "../controllers/images.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import upload from '../middlewares/uploadImages.js'; // Importa el middleware de Multer

const router = Router();

// Ruta para cargar varias imágenes
router.post('/upload', upload.array('images', 5), uploadImages);

// Rutas para obtener imágenes
router.get('/images',authRequired, getImages);
router.get('/images/:id',authRequired, getImage);

export default router;