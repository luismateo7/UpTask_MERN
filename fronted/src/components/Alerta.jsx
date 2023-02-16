
export default function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? 'from-red-500 to-red-700' : 'from-sky-500 to-sky-700'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mt-10`}>
        {alerta.msg}
    </div>
  )
}
