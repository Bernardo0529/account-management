import { useAuth } from "@/context/Auth"
import { ReactNode } from "react"

function PrivateRoute({children}: {children: ReactNode}) {
  const { token } = useAuth()
  
  return !token ? <h2>No acess</h2> : children
}

export default PrivateRoute