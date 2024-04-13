import { useEffect,useState} from 'react';
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'
import Changer from '../components/Changer';




function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const{getTasks,tasks}=useTasks();
  useEffect(()=>{
    getTasks()
  },[])
  // Filtrar casos por busqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())||
        task.region.toString().toLowerCase().includes(searchTerm.toLowerCase())||
        task.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  },[searchTerm, tasks]);

  if(tasks.length===0){ 
    return<h1>No hay casos</h1>

  }

  return (
    // Cartas de casos
    <div>
      <Changer/>
      <h1 className="text-2xl font-bold mb-4">Casos</h1>
      <input
        className="text-black w-full p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Buscar tareas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
    
  )
}

export default TasksPage