import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell,Label } from 'recharts';
import { useTasks } from '../context/TasksContext'; // Importa tu hook personalizado useTasks

const GraficoCircular = () => {
  const { getTasks, tasks } = useTasks(); // Obtiene las funciones y el estado del hook useTasks
  const [regionSeleccionada, setRegionSeleccionada] = useState(''); // Estado para almacenar la región seleccionada

  useEffect(() => {
    getTasks(); // Al montar el componente, obtiene las tareas
  }, []);

  // Calcula el número de casos por región y comuna, filtrando por la región seleccionada
  const casosPorRegionYComuna = useMemo(() => {
    const casosPorRegion = {};
    tasks.forEach(task => {
      if (!regionSeleccionada || task.region === regionSeleccionada) {
        casosPorRegion[task.region] = casosPorRegion[task.region] || { comunas: {} };
        casosPorRegion[task.region].comunas[task.comuna] = true;
      }
    });
  
    // Si se ha seleccionado una región específica y esa región tiene comunas diferentes, dividimos el pastel en segmentos de comunas
    if (regionSeleccionada && casosPorRegion[regionSeleccionada] && Object.keys(casosPorRegion[regionSeleccionada].comunas).length > 1) {
      const regionData = casosPorRegion[regionSeleccionada];
      return Object.entries(regionData.comunas).map(([comuna, _], index) => ({
        name: comuna,
        value: 1,
        comunas: regionData.comunas, // Incluimos las comunas para su posterior acceso
      }));
    }
  
    // Si no hay una región seleccionada o la región seleccionada tiene solo una comuna, mostramos la región como un todo
    return Object.entries(casosPorRegion).map(([region, data]) => ({
      name: region,
      value: Object.keys(data.comunas).length,
      comunas: data.comunas, // Incluimos las comunas para su posterior acceso
    }));
  }, [tasks, regionSeleccionada]);

  // Definimos un array de colores para asignar a cada región
  const colores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', "#f7b6d2"];

  if (tasks.length === 0) {
    return <h1>No hay Casos</h1>; // Si no hay tareas, muestra un mensaje
  }

  const regionesUnicas = [...new Set(tasks.map(task => task.region))];

// Genera las opciones del select a partir de las regiones únicas
const opcionesRegiones = regionesUnicas.map(region => (
  <option key={region} value={region}>{region}</option>
));

  // Si hay tareas, renderiza el gráfico circular (pie chart) con Recharts
  return (
    <div className="flex flex-col items-center">
    <select
      value={regionSeleccionada}
      onChange={e => setRegionSeleccionada(e.target.value)}
      className='text-black bg-white border border-gray-300 rounded-lg p-2 mt-4'
    >
      <option value="" className='text-black'>Filtrar por region</option>
      {opcionesRegiones}
    </select>
    <div className="mt-4">
      <PieChart width={800} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={casosPorRegionYComuna}
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {casosPorRegionYComuna.map((region, index) => (
            <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
          ))}
          {/* Agrega etiquetas personalizadas a las comunas */}
          
        </Pie>
          <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  </div>
  );
};

export default GraficoCircular;
