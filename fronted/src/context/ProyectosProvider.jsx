import { useState, useEffect, createContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{

    const navigate = useNavigate();
    const [ proyectos, setProyectos ] = useState([]);

    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        const obtenerProyectos = async ()=>{
            try {
                if(!token) return
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, config);
                setProyectos(data);
                
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

    const submitProyecto = async proyecto =>{
        try {
            if(!token) return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config);
            setProyectos([...proyectos, data])

            setTimeout(()=>{
                navigate('/proyectos')
            }, 1500)

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
};

export default ProyectosContext;