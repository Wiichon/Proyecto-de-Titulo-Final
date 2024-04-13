import React, { useState, useEffect } from 'react';
import { useEvidences } from '../context/EvidencesContext';
import EvidenceCard from '../components/EvidenceCard';
import Changer from '../components/Changer';

function EvidencePage() {
  const { getEvidences, evidences } = useEvidences();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvidences, setFilteredEvidences] = useState([]);

  useEffect(() => {
    getEvidences();
  }, []);


  // Filtrar evidencias por búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEvidences(evidences);
    } else {
      const filtered = evidences.filter(evidence =>
        evidence.title.toLowerCase().includes(searchTerm.toLowerCase())||
        evidence.description.toLowerCase().includes(searchTerm.toLowerCase())||
        evidence.origin.toLowerCase().includes(searchTerm.toLowerCase())||
        evidence.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvidences(filtered);
    }
  }, [searchTerm, evidences]);

  if (evidences.length === 0) {
    return <h1>No hay evidencias</h1>;
  }

  return (
    // Cartas de evidencias
    <div>
      <Changer />
      <h1 className='text-2xl font-bold mb-4 text-white'>Evidencias</h1>
      <input className=' text-black w-full p-2 border border-gray-300 rounded-md'
        type="text"
        placeholder="Buscar evidencias..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className=' margin-top-1  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredEvidences.map(evidence => (
          <EvidenceCard key={evidence._id} evidence={evidence} />
        ))}
      </div>
    </div>
  );
}

export default EvidencePage;