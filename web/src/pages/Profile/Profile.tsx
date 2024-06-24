//ui
import Alert from "@/components/alert/alert"
import BaseLayout from "@/layouts/BaseLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import { useEffect, useState } from "react"
import { DeleteUser, GetUser, UpdateUser } from "@/services/Requests/User"
import { setLocalStorage } from "@/context/Utils"

//toast
import { ToastContainer, toast } from "react-toastify"

//interface
interface handleAlert {
  title: string,
  description: string
}

function Profile() {
  const [user, setUser] = useState<any>()
  const [updateUser, setUpdateUser] = useState<any>()
  //alert
  const [stateAlert, setStateAlert] = useState(false)
  const [contentAlert, setContentAlert] = useState<handleAlert>({} as handleAlert)

  const { id } = useAuth()
  const navigate = useNavigate()

  /* 
    Function to open alert and set title and description about
  */
  const OpenAlert = ({ title, description }: handleAlert) => {
    setStateAlert(true)
    setContentAlert({ title, description })
  }

  /*
    Load user data
  */
  useEffect(() => {
    const GetUserData = async () => {
      const response = await GetUser(id)
      setUser(response.user)
    }

    GetUserData()
  }, [])

  /*
    Change input value
  */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({...updateUser, [e.target.name]: e.target.value})
  }

  return (
    <div>
      {stateAlert && (
        <Alert title={contentAlert.title} description={contentAlert.description} cancel={() => setStateAlert(false)}>
          {contentAlert.title === "Delete Account" ? (
            <Button onClick={() => {
              DeleteUser(id)
              toast.success("Account deleted", {
                onClose: () => {
                  navigate('/')
                }
              })
              setLocalStorage(null)
            }}>
              {contentAlert.title}
            </Button>
          ) : (
            <Button onClick={() => {
              UpdateUser(id, updateUser)
              toast.success("Data updated")
              setStateAlert(false)
              setUser(updateUser)
            }}>
              {contentAlert.title}
            </Button>
          )}
          
        </Alert>
      )}
      <ToastContainer />
      <BaseLayout>
        {user && (
          <div>
            <h1 className=" mb-10">Hi, {user.name}</h1>

            <div>
              <Tabs defaultValue="account">
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="account">Account</TabsTrigger>
                  <TabsTrigger className="w-full" value="password">Password</TabsTrigger>
                  <TabsTrigger className="w-full" value="delete">Delete Account</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="flex flex-col gap-5">
                        <div>
                          <label htmlFor="name" className="text-sm">Name</label>
                          <Input name="name" defaultValue={user.name} onChange={handleChange}/>
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm">Email</label>
                          <Input name="email" defaultValue={user.email} onChange={handleChange}/>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="mt-5">
                      <Button onClick={() => OpenAlert({ title: "Save Changes", description: "This action results in changes of your account data" })}>
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle >Password</CardTitle>
                      <CardDescription>Change your password here. You'll need it to login.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="flex flex-col gap-5">
                        <div>
                          <label htmlFor="password" className="text-sm">New Password</label>
                          <Input name="password"onChange={handleChange} />
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="mt-5">
                      <Button onClick={() => OpenAlert({ title: "Save Changes", description: "Remember, After saving, you'll be logged out." })}>
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="delete">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delete Account</CardTitle>
                      <CardDescription>Please note that this action is irreversible and will permanently delete all data associated with your account.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={() => OpenAlert({ title: "Delete Account", description: "Are you sure? You'll permanently delete all data associated with your account" })}>
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </BaseLayout>
    </div>
  )
}

export default Profile