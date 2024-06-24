import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SignLayout from "@/layouts/SignLayout"
import { TailSpin } from "react-loader-spinner"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { CreateUser } from "@/services/Requests/User"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//interfaces
interface handleForm {
  name: string,
  email: string,
  password: string
}

function Signup() {
  const [data, setData] = useState<handleForm>({} as handleForm)
  const [loader, setLoader] = useState(false)
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
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)

    setTimeout( async () => {

      try {
        if (!data.name || !data.email || !data.password) {
          toast.error("One more fields not filled")
          return
        }

        await CreateUser(data)
        toast.success("Account created", {
          onClose: () => {
            navigate('/')
          }
        })
      } catch (error) {
        toast.error("Unable to create account, try again")
        return
        
      } finally {
        setLoader(false)
      }
    }, 3000)
  }

  return (
    <div>
      <ToastContainer />
      <SignLayout title="Sign Up" description="To create your account, fill in the empty fields below" isLogin={false}>
        <form onSubmit={handleSignup} className=" flex flex-col gap-4">
          <div>
            <label htmlFor="name">Name</label>
            <Input name="name" value={data.name} onChange={handleChange} />
          </div>
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
              <Button type="submit" className=" h-[46px] w-full">Sign Up</Button>
            )}
          </div>
        </form>
      </SignLayout>
    </div>
  )
}

export default Signup