import express from "express"
import 'dotenv/config'
import { router } from "./routes/api.js"
import sequelize from "./database.js"
import cors from "cors"
const app = express()
const conexao = process.env.CONEXAO
app.use(cors())
try {
    await sequelize.sync()
} catch (erro) {
    console.log(erro)
}

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log("Servidor iniciado"))
