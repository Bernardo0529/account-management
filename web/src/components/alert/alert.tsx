import { Button } from "../ui/button"

import { ReactNode } from "react"

/*
  Interfaces
*/
interface AlertProps {
  title: string,
  description: string,
  children: ReactNode,
  cancel: () => void
}

function Alert({ title, description, children, cancel }: AlertProps) {

  return (
    <div className="fixed flex items-center justify-center h-screen w-full bg-black bg-opacity-70">
      
      <div className="bg-white w-[500px] p-5 rounded">
        <h4 className="text-lg font-medium">
          {title}
        </h4>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
        <div className="mt-5 flex gap-3">
          <Button onClick={cancel}>Cancel</Button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Alert