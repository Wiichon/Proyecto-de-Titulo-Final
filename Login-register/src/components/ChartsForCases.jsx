import React, { useEffect, useMemo } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useTasks } from '../context/TasksContext'; // Importa tu hook personalizado useTasks

const GraficoCircular = () => {
  const { getTasks, tasks } = useTasks(); // Obtiene las funciones y el estado del hook useTasks

  useEffect(() => {
    getTasks(); // Al montar el componente, obtiene las tareas
  }, []);

  // Calcula el número de casos por región y comuna
  const casosPorRegionYComuna = useMemo(() => {
    const casosPorRegion = {};
    tasks.forEach(task => {
      casosPorRegion[task.region] = casosPorRegion[task.region] || {};
      casosPorRegion[task.region][task.comuna] = true;
    });
    const casos = Object.entries(casosPorRegion).map(([region, comunas]) => ({
      name: region, // Cambiamos la propiedad 'region' a 'name' para que Recharts la pueda reconocer
      value: Object.keys(comunas).length // Cuenta el número de comunas en la región
    }));
    return casos;
  }, [tasks]);

  // Definimos un array de colores para asignar a cada región
  const colores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', "#f7b6d2"];

  if (tasks.length === 0) {
    return <h1>No hay Casos</h1>; // Si no hay tareas, muestra un mensaje
  }

  // Si hay tareas, renderiza el gráfico circular (pie chart) con Recharts
  return (
    <div className="flex justify-center items-center">
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
        {/* Asignamos un color diferente a cada región */}
        {casosPorRegionYComuna.map((region, index) => (
          <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </div>

  );
};

export default GraficoCircular;
