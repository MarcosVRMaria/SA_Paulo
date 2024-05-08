import express from "express"
import controller from "../controllers/controller.js"

const router = express.Router()

router.get('/emprestimos', controller.getEmprestimos)
router.get('/getUsuarioNome/:user', controller.getUsuarioNome)
router.get('/getUsuarios/:user/:password', controller.getUsuarios)
router.get('/epi', controller.getEpi)
router.get('/funcinarios', controller.getFuncionarios)
router.post('/authLogin', controller.postVerify)
router.post('/cadastrarUsuario', controller.postUsuario)
router.post('/cadastrarEpi', controller.postEpi)
router.post('/cadastrarFuncionario', controller.postFuncionario)
router.post('/cadastrarEmprestimo', controller.postEmprestimo)
router.put('/editarEpi/:ca', controller.putAtualizarEpi)
router.put('/editarFuncionario/:funcionario', controller.putAtualizarFuncionario)
router.put('/editarEmprestimo', controller.putAtualizarEmprestimos)
router.delete('/deleteEpi/:ca', controller.deleteApagarEpi)
router.delete('/deleteFuncionario/:matricula', controller.deleteApagarFuncionarios)
router.put('/deleteEmprestimo/:matricula/:epi', controller.putAtualizarEmprestimos)



export { router }