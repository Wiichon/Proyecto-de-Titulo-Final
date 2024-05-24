import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const{isAuthenticated,logout,user} = useAuth();
  console.log(user)  

  return (
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10'>
        <Link to={isAuthenticated?"/tasks":"/"}>
            <h1 className='text-2xl font-bold'>Gestor de Evidencias</h1>
        </Link>
        <ul className='flex gap-x-2'>
            {isAuthenticated?(
                <>
                    <li>
                        Bienvenido {user.username}
                    </li>
                    <li>
                        <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">Añadir casos</Link>
                    </li>
                    <li>
                        <Link to="/add-evidence" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">Añadir evidencias</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={()=>{
                            logout()
                        }} className="text-white">Salir</Link>
                    </li>
                </>
            ):(
                <>
                    <li>
                        <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm text-white">Registro</Link>
                    </li>
                </>

            )}
           
            
        </ul>
    </nav>
  )
}

export default NavBar