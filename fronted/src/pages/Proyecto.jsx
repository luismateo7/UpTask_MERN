import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";

export default function Proyecto() {

    const params = useParams();
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, setTarea, alerta } = useProyectos();
    
    useEffect(()=>{
        obtenerProyecto(params.id);
    }, [])

    const handleNuevaTarea = ()=>{
      setTarea({});
      handleModalTarea();
    }

    const { msg } = alerta; 

    return (
        <div>
          {cargando ? (
            <p className="text-gray-700" disabled>Cargando...</p>
          ) : (
            <> 
              <div 
                key={proyecto?.id}
                className='flex justify-between'
              >
                <h1 className="font-black text-4xl ">{proyecto?.nombre}</h1>

                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>

                  <Link
                    to={`/proyectos/editar/${params.id}`}
                    className='uppercase font-bold'
                  >Editar</Link>
                </div>

              </div>

              <button
                onClick={ handleNuevaTarea }
                type="button"
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase bg-sky-400 text-white text-center font-bold mt-5 flex gap-2 hover:bg-sky-600 justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
                Nueva Tarea
              </button>

              <h2 className="font-bold text-xl mt-10">Tareas del Proyecto</h2>

              { msg && (
                <div className="m-auto w-full md:w-1/3 lg:w-2/4">
                  <Alerta alerta={alerta} />
                </div>
              ) }

              <div className="bg-white shadow mt-10 rounded-lg p-3">
                {proyecto?.tareas?.length ? 
                proyecto?.tareas?.map( tarea => (
                  <Tarea 
                    key={tarea._id}
                    tarea={tarea}
                  />
                )) :
                <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
              </div>

              <div className="flex items-center justify-between mt-10">
                <h2 className="font-bold text-xl">Colaboradores</h2>
                <Link
                  to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                  className="text-gray-400 font-bold uppercase hover:text-black"
                >Añadir</Link>
              </div>

              <div className="bg-white shadow mt-10 rounded-lg p-3">
                {proyecto?.colaboradores?.length ? 
                proyecto?.colaboradores?.map( colaborador => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                )) :
                <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
              </div>

              <ModalFormularioTarea />
              <ModalEliminarTarea />
              <ModalEliminarColaborador />
            </>
          )}
        </div>
      );
      
}
