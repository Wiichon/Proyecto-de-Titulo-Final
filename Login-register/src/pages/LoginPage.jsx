import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useNavigate ,Link} from 'react-router-dom';
import { useEffect } from 'react';


function LoginPage() {
  const { register, handleSubmit,
  formState:{errors},
  } = useForm();
  const {signin, errors: signinErrors,isAuthenticated} =useAuth();
  const navigate= useNavigate();

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(()=>{
    if(isAuthenticated)(navigate('/tasks'))
  },[isAuthenticated])



  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='bg-gray-200 max-w-md w-full p-10 rounded-md'>
        {signinErrors.map((error, i) => (
          <div className='bg-red-600 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))}
        <h1 className='text-2xl font-bold mb-4 text-blue-500'>Login</h1>
        <form onSubmit={onSubmit} className='space-y-4'>
          <input
            type='email'
            {...register('email', { required: true })}
            className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <input
            type='password'
            {...register('password', { required: true })}
            className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            placeholder='Password'
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none'
          >
            Login
          </button>
        </form>
        <p className='mt-4 text-blue-500'>
        Don&apos;t have an account?{' '}
          <Link to='/register' className='text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    
  )
}

export default LoginPage