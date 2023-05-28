import { useState, Fragment } from 'react'
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

export default function FormularioColaborador() {

    const [email, setEmaill] = useState("");
    const { alerta, setAlerta, submitInvitarColaborador } = useProyectos();

    const handleSubmit = e => {
        e.preventDefault();

        if (email === "") {
            setAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return
        }

        submitInvitarColaborador(email)
    }

    const { msg } = alerta;

    return (
        <form
            className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
            onSubmit={handleSubmit}
        >

            {msg && (
                <div className='mb-8' style={{ marginTop: '-2rem' }}>
                    <Alerta alerta={alerta} />
                </div>
            )}

            <div className='mb-5'>
                <label
                    htmlFor="email"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Email Colaborador
                </label>
                <input
                    type="email"
                    id='email'
                    placeholder='Email del Usuario'
                    className='border-2 w-full p-2 mt-2 placeholder:gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmaill(e.target.value)}
                />
            </div>

            <input
                type='submit'
                className='bg-sky-600 hover:bg-sky-700 font-bold cursor-pointer text-white uppercase transition-colors rounded p-3 w-full'
                value='Buscar Colaborador'
            />
        </form>
    )
}
