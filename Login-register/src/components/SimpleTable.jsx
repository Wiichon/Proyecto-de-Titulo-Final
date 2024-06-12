import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { useReactTable, getCoreRowModel, flexRender,getSortedRowModel,getFilteredRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { CSVLink } from 'react-csv';

function SimpleTable({data,columns}) {

    const [csvData, setCsvData] = useState([]); // Estado para almacenar los datos CSV




    

    const [sorting,setSorting]=useState([])
    const [filtering,setFiltering]=useState("")

    const table = useReactTable({ 
        data, 
        columns, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(), 
        state: {
            sorting,
            globalFilter:filtering,
        },
        onSortingChange:setSorting,
        onGlobalFilterChange:setFiltering,
        
    });

    return (
        <div >
            <input 
            type="text"
            placeholder='Buscar...' 
            className='text-black border border-gray-300 rounded-md p-2' 
            value={filtering}
            onChange={(e)=>setFiltering(e.target.value)}
            />
            <table className='p-7 border-collapse border-spacing-1 border 1 solid bg-gray-600   '>
                <thead className='bg-gray-500 items-start'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className='even:bg-gray-400 text-left' key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className='text-left p-16' key={header.id}
                                onClick={header.column.getToggleSortingHandler()}>
                                    {header.isPlaceholder ? null :(
                                        <div>
                                            {[flexRender(header.column.columnDef.header,header.getContext())]}
                                            {{asc:'⬆️',desc: '⬇️'}[header.column.getIsSorted()??null]}
                                        </div>
                                    )} 
                                    
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr className='even:bg-gray-700' key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td className='text-left' key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    
                </tfoot>
            </table>
            
            <button className='text-black' onClick={() => table.setPageIndex(0)}>Primer pagina</button>
            <button className='text-black' onClick={() => table.previousPage}>Pagina Anterior</button>
            <button className='text-black' onClick={() => table.nextPage()}>Pagina Siguiente</button>
            <button className='text-black' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Ultima pagina</button>

            <CSVLink data={csvData} filename={'tasks.csv'} className="btn btn-primary mt-4 bg-blue-600 rounded">Exportar CSV</CSVLink>
        </div>
    );
}

export default SimpleTable;