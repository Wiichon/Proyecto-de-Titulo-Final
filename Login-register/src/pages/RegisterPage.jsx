import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);




  return (
    <div className='flex h-screen items-center justify-center'>
      
      <div className=' min-h-screen flex h-{calc(100vh - 100px)} items-center justify-center'>
        <div className='bg-gray-200 max-w-md w-full p-10 rounded-md'>
          {RegisterErrors.map((error, i) => (
            <div className='bg-red-600 p-2 text-white mb-4 rounded' key={i}>
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
          <h1 className='text-2xl font-bold text-blue-500'>Register</h1>
            <input
              type="text"
              {...register("username", { required: true })}
              className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500'
              placeholder='Username'
            />
            {errors.username && (
              <p className='text-red-500'>Nombre de usuario es requerido</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500'
              placeholder='Email'
            />
            {errors.email && (
              <p className='text-red-500'>Email requerido</p>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500'
              placeholder='Password'
            />
            {errors.password && (
              <p className='text-red-500'>Contraseña requerida</p>
            )}

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none'>
              Registrarse
            </button>
          </form>
          <p className='mt-4 text-gray-600'>
            Ya tiene una cuenta? <Link to="/login" className='text-blue-500'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;