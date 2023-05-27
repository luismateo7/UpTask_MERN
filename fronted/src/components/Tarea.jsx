import useProyectos from "../hooks/useProyectos";
import { formatearFecha } from "../../helpers/formatearFecha";

export default function Tarea({tarea, admin}) {

  const { descripcion, nombre, prioridad, fechaEntrega, _id: id, estado} = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">{prioridad}</p>
      </div>

      <div className="flex gap-2 items-center">
        { admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={()=> handleModalEditarTarea(tarea)}
          >Editar</button>
        )}

        <button
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(id)}
        >{ estado ? 'Completa' : 'Incompleta'}</button>

        { admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={()=> handleModalEliminarTarea(tarea)}
          >Eliminar</button>
        )}
      </div>
    </div>
  )
}
