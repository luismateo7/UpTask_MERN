import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function RutaProtegida() {

  const { auth } = useAuth();
  return (
    <>
      {auth._id ? '' : <Navigate to='/'/> }
      <Outlet />
    </>
  )
}
