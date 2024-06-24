import { api } from "../Api"

interface User {
  name: string,
  email: string,
  password: string,
}

export const CreateUser = async({name, email, password}: User) => {
  try {
    const response = await api.post('/create', {name, email, password})

    if (response) {
      return response.statusText
    }
    
  } catch (error) {
    return null
  }
}

export const GetUser = async (id: string | undefined) => {
  try {
    const response = await api.get(`/user/${id}`)
    return response.data
    
  } catch (error) {
    return null
  }
}

export const DeleteUser = async (id: string | undefined) => {
  try {
    const response = await api.delete(`/user/${id}`)
    return response
    
  } catch (error) {
    return null
  }
}

export const UpdateUser = async (id: string | undefined, data: any) => {
  try {
    const response = await api.put(`/user/${id}`, data)
    return response.data
    
  } catch (error) {
    return null
  }
}