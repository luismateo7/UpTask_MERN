import useProyectos from "../hooks/useProyectos";
import { formatearFecha } from "../../helpers/formatearFecha";

export default function Tarea({tarea}) {

  const { descripcion, nombre, prioridad, fechaEntrega, _id: id, estado} = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">{prioridad}</p>
      </div>

      <div className="flex gap-2 items-center">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bolf text-sm rounded-lg"
          onClick={()=> handleModalEditarTarea(tarea)}
        >Editar</button>

        { estado ?
          ( <button
          className="bg-sky-600 px-4 py-3 text-white uppercase font-bolf text-sm rounded-lg"
          >Editar</button> )
                :
          ( <button
            className="bg-gray-600 px-4 py-3 text-white uppercase font-bolf text-sm rounded-lg"
          >Incompleta</button> )
        }

        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bolf text-sm rounded-lg"
          onClick={()=> handleModalEliminarTarea(tarea)}
        >Eliminar</button>
      </div>
      <div></div>
    </div>
  )
}
