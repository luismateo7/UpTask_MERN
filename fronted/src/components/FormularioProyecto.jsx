import { useState } from "react"

import useProyectos from "../hooks/useProyectos";

import Alerta from "./Alerta";

export default function FormularioProyecto() {

    const [ nombre, setNombre ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ fechaEntrega, setFechaEntrega ] = useState('');
    const [ cliente, setCliente ] = useState('');
    const [ alerta, setAlerta ] = useState({})

    const { submitProyecto } = useProyectos();

    const handleSubmit = async e =>{
        e.preventDefault();
        setAlerta({})

        if([ nombre, descripcion, fechaEntrega, cliente].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Pasar los datos hacia el Provider
        await submitProyecto({ nombre, descripcion, fechaEntrega, cliente })
        setAlerta({
            msg: 'Proyecto creado correctamente',
            error: false
        })

        //Reset Formulario
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    }

    const { msg } = alerta;
        
    return (
        <form
            className="bg-white pt-5 pb-10 px-5 md:w-1/2 rounded-lg"
            onSubmit={handleSubmit}
        >

            { msg && <Alerta alerta={alerta}/>}

            <div className="mb-5 mt-5">

                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Nombre Proyecto</label>

                <input
                    id="nombre"
                    type="text"
                    className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Descripción</label>

                <textarea
                    id="descripcion"
                    type="text"
                    className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    value={descripcion}
                    onChange={ e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                
                <label
                    htmlFor="fecha-entrega"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Fecha de Entrega</label>

                <input
                    id="fecha-entrega"
                    type="date"
                    className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={ e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">

                <label
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >Nombre Cliente</label>

                <input
                    id="cliente"
                    type="text"
                    className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={ e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear Proyecto"
                className="bg-sky-600 text-center uppercase text-white w-full font-bold p-3 cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}
