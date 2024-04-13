import React,{useRef} from 'react'
import { useEffect,useState } from 'react'

import { useEvidences } from '../context/EvidencesContext'
import { BarChart,Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ChartsForEvidences() {
  
  const{getEvidences,evidences}=useEvidences();
  
  useEffect(()=>{
    getEvidences()
  },[])

  if(evidences.length===0){ 
    return<h1>No hay evidencias</h1>

  }
  // Agrupar evidencias por origen y sumar cantidades
  const groupedData = evidences.reduce((acc, evidence) => {
    const existingIndex = acc.findIndex(item => item.origin === evidence.origin);
    if (existingIndex !== -1) {
      acc[existingIndex].cantidad += evidence.quantity;
    } else {
      acc.push({ origin: evidence.origin, cantidad: evidence.quantity });
    }
    return acc;
  }, []);
  
  
  return (

<div className="justify-center flex items-center">
      
        <ResponsiveContainer width="50%" aspect={2}>
          <BarChart
            data={groupedData}
            width={300}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="4 1 2" />
            <XAxis dataKey="origin" />
            <YAxis label={{ value: 'Cantidades', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      
      
    </div>
  );
}

export default ChartsForEvidences