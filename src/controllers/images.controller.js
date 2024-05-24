import Image from "../models/images.model.js";

// Cargar una imagen

export const uploadImages = async (req, res) => {
    try {
        const { evidenceId, date } = req.body; // Obtener evidenceId y date del cuerpo de la solicitud
        const imageUrls = req.files.map(file => file.path.replace(/\\/g, '/')); // Obtener las rutas de las imágenes cargadas y reemplazar barras invertidas por barras inclinadas
        // Crear un nuevo documento de imagen con las rutas de los archivos

        const newImage = new Image({
            imageUrls: imageUrls,
            evidenceId: evidenceId,
            date: date
            // Otras propiedades del documento de imagen, si se necesitan
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

// Eliminar una imagen
export const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;

    try {
        const image = await Image.findById(id);
        if (!image) return res.status(404).json({ message: 'Imagen no encontrada' });

        // Filtrar la URL específica
        image.imageUrls = image.imageUrls.filter(url => url !== imageUrl);

        await image.save();

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
};