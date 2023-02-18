import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

export default function NuevoPassword() {

  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  const [ passwordModificado, setPasswordModificado ] = useState(false);

  const [ alerta, setAlerta ] = useState({});
  const [ tokenValido, setTokenValido ] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(()=>{
    const comprobarToken = async () =>{
      try {
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`);

        setTokenValido(true)

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
    return ()=> {comprobarToken()}
  }, [])

  const handleSubmit = async e =>{
    e.preventDefault();

    setAlerta({})

    if([ password, repetirPassword ].includes('')){
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

    //Actualizar el password del usuario en la API
    try {
      //Accedo directamente al req.body gracias al destructuring a data
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
      const { data } = await axios.post(url, { password }); 

      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true);

      //Limpiando el formulario
      setPassword('');
      setRepetirPassword('');

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
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestable tu password y no pierdas acceso a tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta}/>}

      { tokenValido && (
        <form 
          className="my-10 bg-white shadow rounded-lg py-5 px-10"
          onSubmit={handleSubmit}
        >
        
        <div className="my-5">
          <label
            htmlFor="password"
            className="capitalize text-gray-600 block text-xl font-bold"
          >Nuevo password</label>
          
          <input
            type="password" 
            placeholder="Escribe tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value= {password}
            onChange = {e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="capitalize text-gray-600 block text-xl font-bold"
          >Repetir nuevo password</label>
          
          <input
            type="password" 
            placeholder="Repite tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
            value={repetirPassword}
            onChange={ e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Cambiar Contraseña" 
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors my-4"
        />

      </form>

    )}

      {passwordModificado && (
        <nav className="lg:flex lg:justify-between">
          <Link
            to={'/'}
            className='block text-center my-2 text-slate-500 uppercase text-sm'
          >Inicia Sesión
          </Link>
        </nav>
      )}
    </>
  )
}
