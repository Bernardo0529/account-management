import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { ContextProps, UserProps } from "./Interfaces"
import { RequestLogin, getLocalStorage, setLocalStorage } from "./Utils"

export const AuthContext = createContext<ContextProps>({} as ContextProps)

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserProps | null>()

  useEffect(() => {
    const storage = getLocalStorage()

    if (storage) {
      setUser(storage)
    }
  }, [])

  const auth = async (email: string, password: string) => {
    const response = await RequestLogin(email, password)
    const data = {token: response.token, id: response.user._id}
    setUser(data)
    setLocalStorage(data)
  }

  const logout = () => {
    setUser(null)
    setLocalStorage(null)
  }

  return (
    <AuthContext.Provider value={{...user, auth, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}