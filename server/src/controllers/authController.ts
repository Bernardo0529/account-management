import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { User } from "../models/userModel"
import JWT from "jsonwebtoken"

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      //
      if (!email || !password) {
        return res.status(400).send({ message: "Fields missing" })
      }

      //
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      //
      const checkPass = await bcrypt.compare(password, user.password)

      if (!checkPass) {
        return res.status(400).send({ message: "Invalid password" })
      }

      //
      const token = JWT.sign({ id: user.id }, process.env.SECRET || '')

      return res.status(200).send({ user, token })

    } catch (error) {
      return res.status(500).send({ message: "Server error" })
    }

  }
}