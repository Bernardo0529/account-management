import mongoose, { Schema } from "mongoose"

interface UserModelProps {
  name: string,
  email: string,
  password: string
}

const userSchema = new Schema<UserModelProps>({
  name: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  }
})

export const User = mongoose.model("users", userSchema)