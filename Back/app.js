import express from "express"
import 'dotenv/config'
import { router } from "./routes/API.js"
import sequelize from "./database.js"
const app = express()
const conexao = process.env.CONEXAO

try {
    await sequelize.sync()
} catch (erro) {
    console.log(erro)
}

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log("Servidor iniciado"))
