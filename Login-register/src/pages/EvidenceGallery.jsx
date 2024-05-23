import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useEvidences } from '../context/EvidencesContext';

function EvidenceGallery() {
  const [images, setImages] = useState([]);
  const { getEvidences, evidences } = useEvidences();
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);

  useEffect(() => {
    getEvidences();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    fetchImages();

    return () => {
      // Limpiar cualquier suscripción o tarea asíncrona si es necesario
    };
  }, []);

  const handleEvidenceChange = (evidenceId) => {
    setSelectedEvidenceId(evidenceId);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3000/api/images/${imageId}`);
      // Actualizar el estado para eliminar la imagen localmente
      setImages(images.filter(image => image._id !== imageId));
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  const filteredImages = selectedEvidenceId !== null
    ? images.filter(image => image.evidenceId === selectedEvidenceId)
    : images;

  return (
    <div>
      <h2>Evidence Gallery</h2>
      <div className='text-black'>
        <p>Selecciona una evidencia:</p>
        <select onChange={(e) => handleEvidenceChange(e.target.value)}>
          <option value={null}>Todas las evidencias</option>
          {evidences.map(evidence => (
            <option className='text-black' key={evidence._id} value={evidence._id}>{evidence.title}</option>
          ))}
        </select>
      </div>
      <div className="columns-3">
        {filteredImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              className="w-80 h-80"
              src={`http://localhost:3000/${image.imageUrls}`}
              alt={`Evidence ${index + 1}`}
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-2"
              onClick={() => handleDeleteImage(image._id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvidenceGallery;