
import multer, { diskStorage } from 'multer';

// Configuración de Multer para almacenar archivos en la carpeta 'uploads'
const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // La carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

export default upload;