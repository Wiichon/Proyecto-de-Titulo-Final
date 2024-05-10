import Image from "../models/images.model.js";

// Cargar una imagen

export const uploadImages = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path); // Obtener las rutas de las imágenes cargadas
        // Otras operaciones necesarias, como validación de datos, etc.

        // Crear un nuevo documento de imagen con las rutas de los archivos
        const newImage = new Image({
            imageUrls: imageUrls,
            // Otras propiedades del documento de imagen, si las hay
        });

        // Guardar el nuevo documento de imagen en la base de datos
        await newImage.save();

        console.log("Imágenes subidas y guardadas correctamente.");
        res.status(201).send('Imágenes guardadas correctamente.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar las imágenes.');
    }
};
// Obtener todas las imágenes
export const getImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las imágenes.');
    }
};

// Obtener una imagen 
export const getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Imagen no encontrada.');
        }
        res.json(image);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la imagen.');
    }
};