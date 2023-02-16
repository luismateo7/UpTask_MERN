import { Link } from "react-router-dom"

export default function NuevoPassword() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestable tu password y no pierdas acceso a tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg py-5 px-10">
        
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
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="capitalize text-gray-600 block text-xl font-bold"
          >Repetir nuevo password</label>
          
          <input
            type="password2" 
            placeholder="Repite tu nuevo password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
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
