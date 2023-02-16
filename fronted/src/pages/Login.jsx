import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus
        <span className="text-slate-700"> proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg py-5 px-10">
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
