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
  const{register,handleSubmit,setValue}=useForm();
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
      <form onSubmit={onSubmit}>
        <label htmlFor="title">title</label>
        <input 
        type="text" placeholder="Title" 
        {...register("title")}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 '
        autoFocus
        />
        <label htmlFor="description">description</label>
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
          placeholder='Quantity'
          {...register("quantity", { valueAsNumber: true })}
        />
        <label htmlFor="date">Fecha</label>
        <input type="date" className='text-black'{...register("date")} />
        <button className='bg-indigo-500 px-3 py-2 rounded-sm '>Save</button>

        <label htmlFor="task">Seleccionar caso:</label>
        <select id="task" {...register("taskId")}>
          <option value="">-- Seleccionar caso --</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>{task.title}</option>
          ))}
        </select>
        <button className='bg-indigo-500 px-3 py-2 rounded-sm '>Save</button>

      </form>
    </div>
  )
}

export default EvidenceFormPage