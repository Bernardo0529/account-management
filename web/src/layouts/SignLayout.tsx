import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ReactNode } from "react"
import { Link } from "react-router-dom"

//interfaces
interface SignProps {
  title: string,
  description: string,
  children: ReactNode,
  isLogin: boolean
}

function SignLayout({title, description, isLogin, children}: SignProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[500px] p-4">
        <CardHeader>
          <CardTitle className=" text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center text-sm">
            {isLogin ? (
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            ) : (
              <p>Have an account? <Link to="/">Login</Link></p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignLayout