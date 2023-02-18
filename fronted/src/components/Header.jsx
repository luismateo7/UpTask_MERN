import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="px-4 py-5 border-b bg-white">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-center text-sky-600 font-black">Uptask</h2>

        <input 
          type="search"
          placeholder="Buscar Proyecto"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex gap-4 items-center">
          <Link
            to={'/proyectos'}
            className="font-bold uppercase"
          >Proyectos</Link>

          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >Cerrar Sesión</button>
        </div>
      </div>
    </header>
  )
}
