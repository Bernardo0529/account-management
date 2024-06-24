import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { User } from "../models/userModel"

export class UserController {
  //create
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
      //
      if (!name || !email || !password) {
        return res.status(400).send({ message: "Fields missing" })
      }

      //
      const userExists = await User.findOne({ email })

      if (userExists) {
        return res.status(409).send({ message: "Email in use" })
      }

      //
      const hash = await bcrypt.hash(password, 10)

      const user = new User({
        name,
        email,
        password: hash
      })
      await user.save()

      return res.status(201).send({ message: "User created" })
      
    } catch (error) {
      return res.status(500).send({ message: "Server error" })
    }
  } 

  //get user
  async getUser(req: Request, res: Response) {
    const id = req.params.id

    try {
      const user = await User.findById(id)

      return res.status(200).send({ user })
      
    } catch (error) {
      return res.status(500).send({ message: "Server error" })
    }
  }

  //delete user
  async delete(req: Request, res: Response) {
    const id = req.params.id

    try {
      const user = await User.findByIdAndDelete(id)

      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      return res.status(200).send({ message: "User deleted" })
      
    } catch (error) {
      return res.status(500).send({ message: "Server error" })
    }
  }

  //update user
  async update(req: Request, res: Response) {
    const id = req.params.id
    const update = req.body

    try {
      const user = await User.findByIdAndUpdate(id, update, {new: true})

      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      if (update.name) {
        user.name = update.name
      }
      if (update.email) {
        user.email = update.email
      }
      if (update.password) {
        user.password = await bcrypt.hash(update.password, 10)
      }

      await user.save()

      return res.status(200).send({ user, message: "User updated" })

    } catch (error) {
      return res.status(500).send({ message: "Server error" })
    }
  }
}