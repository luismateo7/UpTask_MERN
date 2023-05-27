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
    const [ tarea, setTarea ] = useState({});
    const [ modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [ alerta, setAlerta ] = useState({});
    const [ colaborador, setColaborador ] = useState({});
    const [ modalEliminarColaborador, setModalEliminarColaborador] = useState(false);

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
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
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
        const crearTarea =  async tarea =>{
            try {
                if(!token) return
                
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config);
                
                //Agrega la tarea al state 
                const proyectoActualizado = { ...proyecto }
                proyectoActualizado.tareas = [ ...proyectoActualizado.tareas, data]
                setProyecto(proyectoActualizado)
    
                setmodalFomularioTarea(false) //Cerrar el formulario cuando añado la tarea
    
            } catch (error) {
                console.log(error);
            }
        }

        const editarTarea = async tarea =>{
            try {
                if(!token) return
                
                const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`, tarea, config);

                //Actualizar el DOM
                const proyectoActualizado = { ...proyecto};
                proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => {
                    if(tareaState._id === data._id){
                        tareaState = data
                    }
                    return tareaState
                })
                setProyecto(proyectoActualizado);

                setmodalFomularioTarea(false);
            } catch (error) {
                console.log(error);
            }
        }

        if(tarea?.id) await editarTarea(tarea);
        else await crearTarea(tarea)
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea);
        setmodalFomularioTarea(true);
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            if(!token) return
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`, config);
            setAlerta(data);

            //Actualizar el DOM
            const proyectoActualizado = { ...proyecto};
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id )
            setProyecto(proyectoActualizado);

            setTimeout(()=>{
                setAlerta({});
            }, 2500)

            setModalEliminarTarea(false);
        } catch (error) {
            console.log(error);
        }
    }

    const submitInvitarColaborador = async email =>{
        
        setCargando(true);
        try {
            if(!token) return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`, {email}, config);
            
            setColaborador(data);
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false);
        }
    }

    const agregarColaborador = async email =>{
        try {
            if(!token) return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores/${proyecto._id}`, email, config);

            setAlerta({
                msg: data.msg,
                error: false
            })

            setColaborador({});

            setTimeout(()=>{
                setAlerta({});
            }, 2500)
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalEliminarColaborador = colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador);
        setColaborador(colaborador);
    }

    const eliminarColaborador = async () => {
        try {
            if(!token) return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id}, config);

            const proyectoActualizado = {...proyecto};

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter( colaboradorState => colaboradorState._id !== colaborador._id );

            setProyecto(proyectoActualizado);
            
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({});
            setModalEliminarColaborador(false);

        } catch (error) {
            console.log(error.response);
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
                submitTarea,
                setTarea,
                tarea,
                handleModalEditarTarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                setAlerta,
                alerta,
                submitInvitarColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador
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