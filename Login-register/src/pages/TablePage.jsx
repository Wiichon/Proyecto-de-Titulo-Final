import React from 'react'
import { useEffect,useState } from 'react'
import { useEvidences } from '../context/EvidencesContext';
import SimpleTable from '../components/SimpleTable'
import dayjs from 'dayjs';
import { useTasks } from '../context/TasksContext';
import Changer from '../components/Changer'
function TablePage() {
  const [showCases, setShowCases] = useState(true); // Estado para controlar si mostrar casos o evidencias
  const { getTasks, tasks } = useTasks();
  const { getEvidences, evidences } = useEvidences();

  useEffect(() => {
    if (showCases) {
      getTasks(); // Obtiene las tareas si se muestran casos
    } else {
      getEvidences(); // Obtiene las evidencias si se muestran evidencias
    }
  }, [showCases]); // Ejecuta el efecto cuando cambia showCases

  // Define las columnas para casos
  const columnsCases = [
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
    },
    {
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
      cell: info => dayjs(info.getValue()).format('DD/MM/YYYY'),
    },
    {
      header: 'Fecha de Cierre',
      accessorKey: 'datefinal',
      cell: info => dayjs(info.getValue()).format('DD/MM/YYYY'),
    },
  ];

  // Define las columnas para evidencias
  const columnsEvidences = [
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
      header: 'Tipo',
      accessorKey: 'origin',
    },
    {
      header: 'Fecha de Ingreso',
      accessorKey: 'date',
      cell: info => dayjs(info.getValue()).format('DD/MM/YYYY'),
    },
  ];

  // Define las columnas y datos basado en si se muestran casos o evidencias
  const columns = showCases ? columnsCases : columnsEvidences;
  const data = showCases ? tasks : evidences;

  return (
    <div>
      <Changer />
      <button onClick={() => setShowCases(!showCases)}>
        {showCases ? 'Mostrar Evidencias' : 'Mostrar Casos'}
      </button>
      <SimpleTable
        columns={columns}
        data={data}
        
      />
    </div>
  )
}

export default TablePage