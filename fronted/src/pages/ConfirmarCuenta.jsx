import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

import Alerta from "../components/Alerta"

export default function ConfirmarCuenta() {

  const [ alerta, setAlerta ] = useState({})

  const params = useParams();
  const { token } = params;

  useEffect(()=>{
    const confirmarCuenta = async () =>{
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`;
        const { data } = await axios(url);

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
  return ()=> {confirmarCuenta()};
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y empieza a crear tus
          <span className="text-slate-700"> proyectos</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}
          
        <Link
          to={'/'}
          className='block text-center mt-10 mb-5 text-slate-500 uppercase text-sm'
          >Inicia Sesión
        </Link>
      </div>
    </>
  )
}
