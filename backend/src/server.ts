import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import userRoutes from "./routes/route"

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

app.use("/", userRoutes)

app.all("*", (req: Request, res: Response) => {
  res.send("That route doesn't exist")
})

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})
