import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from "axios"
import useAuth from "../hooks/useAuth"

export default function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async e =>{
    e.preventDefault();

    if([ email, password ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      //Accedo directamente al req.body gracias al destructuring a data
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, { email, password }); 

      localStorage.setItem('token', data.token);
      setAuth(data)

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg py-5 px-10"
        onSubmit={handleSubmit}
      >
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
            onChange={ e => setEmail(e.target.value)}
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

        <input
          type="submit"
          value="Inicia Sesión" 
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors my-4"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to={'/registrar'}
          className='block text-center my-2 text-slate-500 uppercase text-sm'
        >¿No tienes una cuenta? Regístrate
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
