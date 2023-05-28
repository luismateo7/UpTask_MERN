import useProyectos from "../hooks/useProyectos";
import { formatearFecha } from "../../helpers/formatearFecha";

export default function Tarea({tarea, admin}) {

  const { descripcion, nombre, prioridad, fechaEntrega, _id: id, estado} = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();

  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">{prioridad}</p>
        { estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completado  por: {tarea.completado.nombre}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-2 items-center">
        { admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg w-full"
            onClick={()=> handleModalEditarTarea(tarea)}
          >Editar</button>
        )}

        <button
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg w-full`}
          onClick={() => completarTarea(id)}
        >{ estado ? 'Completa' : 'Incompleta'}</button>

        { admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg w-full"
            onClick={()=> handleModalEliminarTarea(tarea)}
          >Eliminar</button>
        )}
      </div>
    </div>
  )
}
