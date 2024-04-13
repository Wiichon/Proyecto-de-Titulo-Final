import React from 'react'
import { LineChart,Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTasks } from '../context/TasksContext';
import { useEffect } from 'react';

function ChartsForCases() {
    /* const{getTasks,tasks}=useTasks();
    useEffect(()=>{
      getTasks()
    },[])
  
    if(evidences.length===0){ 
      return<h1>No hay Casos</h1>
  
    } */
    // Agrupar evidencias por origen y sumar cantidades
    const data = [
        { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Mayo', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Junio', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Julio', uv: 3490, pv: 4300, amt: 2100 },
      ];
  
    return (
  
            <div className="justify-center flex items-center">
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart></div>
      
    );
}

export default ChartsForCases