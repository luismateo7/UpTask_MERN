import { useState, useEffect, createContext } from "react";
import axios from "axios"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{

    const [ proyectos, setProyectos ] = useState([]);

    const submitProyecto = async proyecto =>{
        try {
            console.log(proyecto);
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config);

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