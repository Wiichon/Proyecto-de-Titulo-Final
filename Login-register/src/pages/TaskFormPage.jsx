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
      <h1 className='text-2xl font-bold'>Formulario de casos</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input 
        type="text" placeholder="Titulo" 
        {...register("title")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
        autoFocus
        />
        <label htmlFor="description">Descripcion</label>
        <textarea rows="3" placeholder="Descripción"
        {...register("description")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        
        >       
        </textarea>

        <label htmlFor="region">Región</label>
        <select {...register("region")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
          <option value="Arica y Parinacota">Arica y Parinacota</option>
          <option value="Tarapacá">Tarapacá</option>
          <option value="Antofagasta">Antofagasta</option>
          <option value="Atacama">Atacama</option>
          <option value="Coquimbo">Coquimbo</option>
          <option value="Valparaíso">Valparaíso</option>
          <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
          <option value="Libertador General Bernardo O'Higgins">Libertador General Bernardo O'Higgins</option>
          <option value="Maule">Maule</option>
          <option value="Ñuble">Ñuble</option>
          <option value="Biobío">Biobío</option>
          <option value="La Araucanía">La Araucanía</option>
          <option value="Los Ríos">Los Ríos</option>
          <option value="Los Lagos">Los Lagos</option>
          <option value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</option>
          <option value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</option>
        </select>

        <label htmlFor="region">Comuna</label>
        <input type="text" placeholder='Comuna' {...register("comuna")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" '/>


        <label htmlFor="status">Estado del caso</label>
        <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name='Status' {...register("status")}>
          <option value="En proceso">En proceso</option>
          <option value="Terminado">Terminado</option>
          <option value="En juicio">En juicio</option>
          <option value="Otros">Otros</option>
        </select>

        <label htmlFor="date">Fecha Inicio</label>
        <input type="date" className='text-black'{...register("date")} />
          <br />
        <label htmlFor="datefinal" className='text-white'>Fecha Termino</label>
        
        <input type="date" className='text-black'{...register("datefinal")} />
        <button className='bg-indigo-500 px-3 py-2 rounded-sm '>Save</button>


      </form>
    </div>
  )
}

export default TaskFormPage