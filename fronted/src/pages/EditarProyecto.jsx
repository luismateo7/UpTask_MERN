import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos"
import FormularioProyecto from "../components/FormularioProyecto"

export default function EditarProyecto() {

    const { obtenerProyecto, proyecto, cargando} = useProyectos();
    const params = useParams();
    
    useEffect(()=>{
        obtenerProyecto(params.id);
    }, [])

    return (
        <>
            {cargando ? (
                <p className="text-gray-700" disabled>Cargando...</p>
            ) : (
                <>
                    <h1 className="font-black text-4xl">Editar Proyecto: {proyecto.proyecto?.nombre}</h1>
                    <div className="m-10 flex justify-center">
                        <FormularioProyecto />
                    </div>
                </>
            )}
        </>
    )
}
