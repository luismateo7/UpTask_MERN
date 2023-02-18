import FormularioProyecto from "../components/FormularioProyecto"

export default function NuevoProyecto() {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>
      <div className="m-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}
