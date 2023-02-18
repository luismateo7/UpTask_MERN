import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false)
                return;
            }
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, config);
                setAuth(data);
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }
        
        autenticarUsuario()
    }, [])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
};

export default AuthContext;
