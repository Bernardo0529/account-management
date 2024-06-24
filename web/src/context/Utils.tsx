import { api } from "../services/Api"
import { UserProps } from "./Interfaces"

export const RequestLogin = async (email: string, password: string) => {
  try {
    const request = await api.post('/auth', {email, password})
    return request.data
    
  } catch (error) {
    return null
  }
} 

export const setLocalStorage = (user: UserProps | null) => {
  localStorage.setItem('@', JSON.stringify(user))
}

export const getLocalStorage = () => {
  const item = localStorage.getItem('@')

  if (!item) {
    return null
  }

  const dataStorage = JSON.parse(item)
  return dataStorage ?? null
}