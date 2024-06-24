import * as dotenv from "dotenv"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import { router } from "./router/router"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, () => {
  mongoose.connect("mongodb://localhost:27017/account_bd")
  console.log("App running")
})