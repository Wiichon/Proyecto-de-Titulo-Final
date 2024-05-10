import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEvidences } from '../context/EvidencesContext';

function ImageUploader() {
    const { getEvidences, evidences } = useEvidences();
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        getEvidences();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (const file of selectedFiles) {
            formData.append('images', file);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Images uploaded successfully:', response.data);
            setSelectedFiles([]); // Reinicia el estado de selectedFiles después de la carga exitosa
            // Aquí podrías manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito al usuario
        } catch (error) {
            console.error('Error uploading images:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div>
            <label htmlFor="evidence">Seleccionar Evidencia:</label>
            <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name="evidence" id="evidence">
                <option className='text-black' value="">-- Seleccionar evidencia --</option>
                {evidences.map((evidence) => (
                    <option key={evidence._id} value={evidence._id}>{evidence.title}</option>
                ))}
            </select>
            <h1>Subir Imágenes</h1>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Imágenes</button>
            {/* Mostrar las imágenes seleccionadas */}
            <div>
                <h2>Imágenes seleccionadas:</h2>
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index}>
                            {file.name}
                            <button onClick={() => handleRemoveImage(index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ImageUploader;