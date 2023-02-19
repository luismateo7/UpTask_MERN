import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{

    const navigate = useNavigate();
    const [ proyectos, setProyectos ] = useState([]);
    const [ proyecto, setProyecto ] = useState({});
    const [ cargando, setCargando ] = useState(true);
    const [ modalFomularioTarea, setmodalFomularioTarea ] = useState(false);

    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const obtenerProyectos = async ()=>{
        try {
            if(!token) return

            const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, config);
            setProyectos(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    const submitProyecto = async proyecto =>{
        try {
            if(!token) return
            
            if(proyecto.id){
                const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${proyecto.id}`, proyecto, config);

                //Sincronizar State
                const proyectosActualizados = proyectos.map( proyectoState =>
                    data._id === proyectoState._id ? data : proyectoState
                )
                setProyectos(proyectosActualizados);
            }
            
            else{
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config);
                console.log(data);
                setProyectos([...proyectos, data])
            }

            setTimeout(()=>{
                navigate('/proyectos')
            }, 1500)

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProyecto = async id =>{
        setCargando(true);
        try {
            if(!token) return
            const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config);
            setProyecto(data);
        } catch (error) {
            console.log(error);
        }
        setCargando(false);
    }

    const eliminarProyecto = async id =>{
        try {
            if(!token) return
            
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config);

            //Sincronizar State
            const proyectosActualizados = proyectos.filter( proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setTimeout(()=>{
                navigate('/proyectos')
            }, 1500)

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = ()=>{
        setmodalFomularioTarea(!modalFomularioTarea);
    }

    const submitTarea = async tarea =>{
        try {
            if(!token) return
            
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                obtenerProyectos,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFomularioTarea,
                handleModalTarea,
                submitTarea
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