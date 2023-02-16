import { useState } from "react"
import { Link } from "react-router-dom"

import Alerta from "../components/Alerta";

export default function Registrar() {

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = e =>{
    e.preventDefault();

    setAlerta({})

    if([ nombre, email, password, repetirPassword ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: 'El password es muy corto, agrega mínimo 6 caracteres',
        error: true
      })
      return
    }

  }
  
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg py-5 px-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className=" text-gray-600 block text-xl font-bold"
          >Nombre</label>

          <input
            type="text" 
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="email"
            className=" text-gray-600 block text-xl font-bold"
          >Email</label>

          <input
            type="email" 
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className=" text-gray-600 block text-xl font-bold"
          >Password</label>
          
          <input
            type="password" 
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className=" text-gray-600 block text-xl font-bold"
          >Repetir password</label>
          
          <input
            type="password" 
            placeholder="Repetir tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta" 
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors my-4"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to={'/'}
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          to={'/olvide-password'}
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >Olvide mi passwrod
        </Link>
      </nav>
    </>
  )
}
