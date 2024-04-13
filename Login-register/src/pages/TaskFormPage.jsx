import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect } from 'react'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


function TaskFormPage() {

  const{register,handleSubmit,setValue}=useForm()
  const {createTask,getTask,updateTask} = useTasks()
  const navigate = useNavigate()
  const params = useParams()
 
  useEffect(()=>{
    async function loadTask(){
      if(params.id){
        const task=await getTask(params.id)
        console.log(task)
        setValue('title',task.title)
        setValue('description',task.description)
      }
    }
    loadTask()
  },[])

  const onSubmit=handleSubmit((data)=>{
    if(params.id){
      updateTask(params.id,{
        ...data,
        date:dayjs(data.date).utc().format()
      })
    }else{
      createTask({
        ...data,
        date:dayjs(data.date).utc().format()
      })
      
    }
    navigate('/tasks')

  })


  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input 
        type="text" placeholder="Title" 
        {...register("title")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
        autoFocus
        />
        <label htmlFor="description">Descripcion</label>
        <textarea rows="3" placeholder="Description"
        {...register("description")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        
        >       
        </textarea>

        <label htmlFor="region">Region</label>
        <input type="text" {...register("region")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>

        <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name='Status' {...register("status")}>
          <option value="En proceso">En proceso</option>
          <option value="Terminado">Terminado</option>
          <option value="En juicio">En juicio</option>
          <option value="Otros">Otros</option>
        </select>

        <label htmlFor="date">Fecha Inicio</label>
        <input type="date" className='text-black'{...register("date")} />
        <button className='bg-indigo-500 px-3 py-2 rounded-sm '>Save</button>

        //Fecha de termino
      </form>
    </div>
  )
}

export default TaskFormPage