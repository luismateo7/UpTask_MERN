import { useContext }from 'react'
import ProyectosContext from '../context/ProyectosProvider'

export default function useProyectos() {
  return useContext(ProyectosContext)
}