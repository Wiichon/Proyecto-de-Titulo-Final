import { createContext,useState,useContext,useEffect } from "react";
import { registerRequest,loginRequest,verifyTokenRequest } from '../../api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used withim an AuthProvider");
    }
    return context;

}

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null)
    const [isAuthenticated,setisAuthenticated]=useState(false)
    const [errors,setErrors]=useState([]);
    const [loading,setLoading]=useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data)
            setisAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }
    const signin =async(user)=>{
        try {
            const res = await loginRequest(user)
            console.log(res)
            setisAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        
        }
        //Hasta aqui esta bien
    }
    
    const logout=()=>{
        Cookies.remove('token')
        setisAuthenticated(false)
        setUser(null)

    }


    useEffect(()=>{
        if(errors.length>0){
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return()=>clearTimeout(timer)
        }
    },[errors])

    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          
          if (!cookies.token) {
            setisAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            console.log(res);
            if (!res.data) return setisAuthenticated(false);
            setisAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setisAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
    

    return(
        <AuthContext.Provider 
        value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}