export interface UserProps {
  id?: string,
  token?: string
}

export interface ContextProps extends UserProps {
  auth: (email: string, password: string) => Promise<void>,
  logout: () => void
}