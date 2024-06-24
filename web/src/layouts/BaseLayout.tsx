import Alert from "@/components/alert/alert"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/context/Auth"
import { ReactNode, useState } from "react"
import { Link } from "react-router-dom"

/* 
  All site pages
*/
const pages = [
  {
    name: "Profile",
    path: "/profile"
  }
]

function BaseLayout({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState(false)
  const { logout } = useAuth()

  return (
    <div>
      {/* Alert Content */}
      {alert && (
        <Alert title="Logout" description="You're about to logout, if you do this you'll need to login later" cancel={() => setAlert(false)}>
          <Button onClick={logout}>Logout</Button>
        </Alert>
      )}

      {/* Layout */}
      <div className="flex">
        <div className="p-8 shadow w-[300px] h-screen flex flex-col justify-between">
          <nav>
            <ul className=" flex flex-col gap-2">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link to={page.path}>
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p onClick={() => setAlert(true)} className=" cursor-pointer">Logout</p>
          </div>
        </div>

        <div className="p-8 w-full ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default BaseLayout