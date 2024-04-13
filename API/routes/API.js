import express from "express"
import controller from "../controllers/controller.js"

const router = express.Router()

router.get('/emprestimos', controller.getEmprestimos)
router.get('/getUsuarios/:user', controller.getUsuarios)
router.get('/epi', controller.getEpi)
router.get('/funcinarios', controller.getFuncionarios)
router.post('/cadastrarUsuario', controller.postUsuario)
router.post('/cadastrarEpi', controller.postEpi)
router.post('/cadastrarFuncionario', controller.postFuncionario)
router.post('/cadastrarEmprestimo', controller.postEmprestimo)



export { router }