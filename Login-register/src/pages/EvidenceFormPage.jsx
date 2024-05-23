import React from 'react'
import { useEvidences } from '../context/EvidencesContext'
import {useForm} from 'react-hook-form'
import { useNavigate,useParams } from 'react-router-dom'
import {useTasks} from '../context/TasksContext'
import { useEffect,useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function EvidenceFormPage() {
  const{register,handleSubmit,setValue,formState: { errors }}=useForm();
  const {createEvidence,updateEvidence,getEvidence} = useEvidences();
  const navigate = useNavigate();
  const params = useParams();
  const { getTasks, tasks } = useTasks(); // Obtener la función getTasks de useTasks



  useEffect(()=>{
    getTasks()
  },[])




  useEffect(()=>{
    async function loadEvidence(){
      if(params.id){
        const evidence=await getEvidence(params.id)
        console.log(evidence)
        setValue('title',evidence.title)
        setValue('description',evidence.description)
        setValue('origin',evidence.origin)
        setValue('quantity',evidence.quantity)
        setValue('taskiD',evidence.taskiD)
      }
    }
    loadEvidence()
  },[])

  const onSubmit=handleSubmit((data)=>{
    if(params.id){
      updateEvidence(params.id,{
        ...data,
        date:dayjs(data.date).utc().format()
      })
    }else{
      createEvidence({
        ...data,
        date:dayjs(data.date).utc().format(),
        
      })
      
      
    }
    navigate('/evidence')

  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h1 className='text-2xl font-bold p-2'>Formulario de evidencias</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text" placeholder="Title"
          {...register("title", { required: true })} // Añadida validación
          className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ${errors.title ? 'border-red-500' : ''}`} // Añadido estilo para indicar error
          autoFocus
        />
        {errors.title && <p className="text-red-500">Este campo es obligatorio</p>}
        <label htmlFor="description">Descripcion</label>
        <textarea rows="3" placeholder="Description"
        {...register("description")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'   
        >
        
        </textarea>
        <label htmlFor="Type">Tipo</label>
        <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name='Type' {...register("origin")}>
          <option value="Narcoticos">Narcoticos</option>
          <option value="Armas">Armas</option>
          <option value="Especies">Especies</option>
          <option value="Otros">Otros</option>
        </select>
        <label htmlFor="quantity">Cantidad</label>
        <input  
          className='w-full bg-zinc-700 px-4 py-2 rounded-md my-2'
          type="number"
          placeholder='Cantidad'
          {...register("quantity", { valueAsNumber: true })}
        />
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          className={`w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 ${errors.date ? 'border-red-500' : ''}`}
          {...register("date", { required: true })}
        />
        {errors.date && <p className="text-red-500">Este campo es obligatorio</p>}
        <br />
        <label htmlFor="task">Seleccionar caso:</label>
        
        <select  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name="task" id="task" {...register("taskId")}>
          <option className='text-black' value="">-- Seleccionar caso --</option>
          {tasks.map((task) => (
            <option  key={task._id} value={task._id}>{task.title}</option>
          ))}
        </select>
        <button className='bg-indigo-500 px-3 py-2 rounded-sm '>Save</button>

      </form>
    </div>
  )
}

export default EvidenceFormPage