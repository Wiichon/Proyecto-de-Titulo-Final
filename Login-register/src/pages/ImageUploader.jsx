import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEvidences } from '../context/EvidencesContext';
import Changer from '../components/Changer';

function ImageUploader() {
    const { getEvidences, evidences } = useEvidences();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEvidences();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    };

    const handleUpload = async () => {
        const selectedEvidenceId = document.getElementById('evidence').value; // Obtener el ID de la evidencia seleccionada
    
        if (!selectedEvidenceId) {
            console.error('Por favor selecciona una evidencia antes de subir imágenes.');
            
            return;
        }
    
        if (selectedFiles.length === 0) {
            console.error('No se han seleccionado imágenes para subir.');
            
            return;
        }
    
        const formData = new FormData();
        for (const file of selectedFiles) {
            formData.append('images', file);
        }
        
        formData.append('evidenceId', selectedEvidenceId); // Agregar el ID de evidencia al formulario de datos
    
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
        navigate('/evidence');
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div>
            <Changer/>
            <label htmlFor="evidence" className='text-black'>Seleccionar Evidencia:</label>
            <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name="evidence" id="evidence">
                <option className='' value="">-- Seleccionar evidencia --</option>
                {evidences.map((evidence) => (
                    <option key={evidence._id} value={evidence._id}>{evidence.title}</option>
                ))}
            </select>
            <h1 className='text-black'>Subir Imágenes</h1>
            <input type="file" multiple onChange={handleFileChange} />
            <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md' onClick={handleUpload}>Subir Imágenes</button>
            {/* Mostrar las imágenes seleccionadas */}
            <div>
                <h2 className='text-black'>Imágenes seleccionadas:</h2>
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li className='text-black' key={index}>
                            {file.name}
                            <button  className='bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-md' onClick={() => handleRemoveImage(index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ImageUploader;