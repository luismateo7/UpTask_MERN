import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios"
import io from "socket.io-client";

let socket;

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
    const [ buscador, setBuscador ] = useState(false);

    const token = localStorage.getItem('token');
    const { auth } = useAuth();
    
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
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

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
            setAlerta({});
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

                //Socket IO
                socket.emit('nueva tarea', data)
    
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

                // Socket IO
                socket.emit('actualizar tarea', data);

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
            
            //Socket IO
            socket.emit('eliminar tarea', tarea)

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
            
            setColaborador({});
            setTimeout(() => {
                setAlerta({});
            }, 2500);
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

            setTimeout(() => {
                setAlerta({});
            }, 2500)
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
            
            setTimeout(() => {
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            }, 2500);

            setColaborador({});
            setModalEliminarColaborador(false);

        } catch (error) {
            console.log(error.response);
        }
    }

    const completarTarea = async id => {
        try {
            if(!token) return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`, {}, config);

            const proyectoActualizado = {...proyecto};

            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)

            setProyecto(proyectoActualizado);
            setTarea({});
            setAlerta({});

            // Socket Io
            socket.emit('cambiar estado tarea', data);

        } catch (error) {
            console.log(error.response);
        }
    }

    const handleBuscador = ()=>{
        setBuscador(!buscador);
    }

    // SOCKET IO
    const submitTareasProyecto = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [ ...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }

    const eliminarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id )
        setProyecto(proyectoActualizado);
    }

    const actualizarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => {
            if(tareaState._id === tarea._id){
                tareaState = tarea
            }
            return tareaState
        })
        setProyecto(proyectoActualizado);
    }

    const completarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => {
            if(tareaState._id === tarea._id){
                tareaState = tarea
            }
            return tareaState
        })
        setProyecto(proyectoActualizado);
    }

    const cerrarSesionProyectos = ()=>{
        setProyectos([]);
        setProyecto({});
        setAlerta({});
    }

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                setProyecto,
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
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                completarTareaProyecto,
                cerrarSesionProyectos
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