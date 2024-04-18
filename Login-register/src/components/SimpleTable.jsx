import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { CSVLink } from 'react-csv';

function SimpleTable() {
    const { getTasks, tasks } = useTasks(); // Obtiene las funciones y el estado del hook useTasks
    const [csvData, setCsvData] = useState([]); // Estado para almacenar los datos CSV

    useEffect(() => {
        getTasks(); // Al montar el componente, obtiene las tareas
    }, []);

    useEffect(() => {
        // Formatea los datos para CSV cuando se actualiza la lista de tareas
        const formattedData = tasks.map(task => ({
            ID: task._id,
            Titulo: task.title,
            Descripcion: task.description,
            Estado: task.status,
            Region: task.region,
            Comuna: task.comuna,
            'Fecha de Ingreso': task.date,
            'Fecha de Cierre': task.datefinal
        }));
        setCsvData(formattedData);
    }, [tasks]);

    const columns = [
        {
            header: 'ID',
            accessorKey: '_id',
        },
        {
            header: 'Titulo',
            accessorKey: 'title',
        },
        {
            header: 'Descripcion',
            accessorKey: 'description',
        },
        {
            header: 'Estado',
            accessorKey: 'status',
        }, {
            header: 'Region',
            accessorKey: 'region',
        },
        {
            header: 'Comuna',
            accessorKey: 'comuna',
        },
        {
            header: 'Fecha de Ingreso',
            accessorKey: 'date',
        },
        {
            header: 'Fecha de Cierre',
            accessorKey: 'datefinal',
        }
    ];

    const table = useReactTable({ data: tasks, columns: columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div>
            <CSVLink data={csvData} filename={'tasks.csv'} className="btn btn-primary">Exportar CSV</CSVLink>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}

export default SimpleTable;