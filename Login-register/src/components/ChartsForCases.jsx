import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
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
        if (!casosPorRegion[task.region]) {
          casosPorRegion[task.region] = { comunas: {}, total: 0 };
        }
        casosPorRegion[task.region].comunas[task.comuna] = (casosPorRegion[task.region].comunas[task.comuna] || 0) + 1;
        casosPorRegion[task.region].total += 1;
      }
    });

    // Si se ha seleccionado una región específica
    if (regionSeleccionada) {
      const regionData = casosPorRegion[regionSeleccionada];
      if (regionData && Object.keys(regionData.comunas).length > 1) {
        // Si la región tiene más de una comuna, mostrar por comuna
        return Object.entries(regionData.comunas).map(([comuna, value]) => ({
          name: comuna,
          value,
        }));
      } else if (regionData) {
        // Si la región tiene solo una comuna, mostrar la comuna
        const [comuna] = Object.keys(regionData.comunas);
        return [{ name: comuna, value: regionData.total }];
      }
    }

    // Si no hay una región seleccionada o la región tiene más de una comuna
    return Object.entries(casosPorRegion).map(([region, data]) => ({
      name: region,
      value: data.total,
    }));
  }, [tasks, regionSeleccionada]);

  // Definimos un array de colores para asignar a cada región
  const colores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', "#f7b6d2"];

  if (tasks.length === 0) {
    return <h1>No hay Casos</h1>; // Si no hay casos, muestra un mensaje
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
        <option value="" className='text-black'>Filtrar por región</option>
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
            {casosPorRegionYComuna.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </div>
    </div>
  );
};

export default GraficoCircular;