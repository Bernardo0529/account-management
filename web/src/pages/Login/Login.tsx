import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SignLayout from "@/layouts/SignLayout"
import { TailSpin } from "react-loader-spinner"

import { useAuth } from "@/context/Auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//interfaces
interface handleForm {
  email: string,
  password: string
}

function Login() {
  const [data, setData] = useState<handleForm>({} as handleForm)
  const [loader, setLoader] = useState(false)
  const { auth } = useAuth()
  const navigate = useNavigate()

  /*
    function to set values when change
  */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  /*
    function to authenticate
  */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)

    setTimeout(async () => {
      try {
        await auth(data.email, data.password)
        toast.success("Login done, you'll be redirected", {
          onClose: () => {
            navigate('/profile')
          }
        })
      } catch (error) {
        toast.error("Error to login, check your credencials")
        return
      } finally {
        setLoader(false)
      }
    }, 3000)
  }

  return (
    <div>
      <ToastContainer />
      <SignLayout title="Login" description="Login to your account, use your email and password" isLogin={true}>
        <form onSubmit={handleLogin} className=" flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input name="email" value={data.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input name="password" value={data.password} onChange={handleChange} />
          </div>
          <div className="mt-5 w-full flex justify-center">
            {loader ? (
              <TailSpin color="black" width={46} height={46}/>
            ) : (
              <Button type="submit" className=" h-[46px] w-full">Login</Button>
            )}           
          </div>
        </form>
      </SignLayout>
    </div>
  )
}

export default Login