import useProyectos from "../hooks/useProyectos"

export default function Colaborador({ colaborador, admin }) {

    const { handleModalEliminarColaborador, modalEliminarColaborador } = useProyectos();

    const { nombre, email } = colaborador

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>

            { admin && (
                <div>
                    <button
                        type="button"
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEliminarColaborador(colaborador)}
                    >Eliminar</button>
                </div>
            )}
        </div>
    )
}
