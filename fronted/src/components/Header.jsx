import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="px-4 py-5 border-b bg-white">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-center text-sky-600 font-black mb-5 md:mb-0">Uptask</h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">

          <button
            type="button"
            className="font-bold uppercase"
          >Buscar Proyecto</button>

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
