import tabelas from '../models/models.js'


//GET'S

const getEpi = async (req, res) => {
    try {
        const tabela = await tabelas.Epi.findAll({})
        res.status(200).send({ tabela })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar EPI' })
    }
}

const getFuncionarios = async (req, res) => {
    try {
        const tabela = await tabelas.Funcionarios.findAll({})
        res.status(200).send({ tabela })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar Funcionarios' })
    }
}

const getEmprestimos = async (req, res) => {
    try {
        const tabela = await tabelas.Emprestimos.findAll({})
        res.status(200).send({ tabela })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar EPI' })
    }
}
const getUsuarioNome = async (req, res) => {
    const { user } = req.params
    try {
        const tabela = await tabelas.Cadastro.findAll({ where: { nome: user } })
        res.status(200).send({ tabela })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar Usuários por nome' })
    }
}
const getUsuarios = async (req, res) => {
    const { user, password } = req.params
    try {
        const tabela = await tabelas.Cadastro.findAll({ where: { nome: user, senha: password } })
        console.log(tabela)
        res.status(200).send({ tabela })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar Usuários' })
    }
}




//POST'S

const postVerify = async (req, res) => {
    const { user, password } = req.body
    try {
        const tabela = await tabelas.Cadastro.findAll({ where: { nome: user, senha: password } })
        console.log(tabela)
        if (tabela.length == 0) {
            res.status(201).send({ mensagem: "Usuario ou senha incorreta" })
            // alert('Usuario ou senha incorreta')
        } else {
            res.status(201).send(true)
        }
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro' })
    }
}

const postEpi = async (req, res) => {
    try {
        const { tipo, marca, nome, ca, validade } = req.body
        if (!tipo || !marca || !nome || !ca || !validade) return res.status(404).send({ mensagem: 'Campos incompletos' })
        const epiCriada = await tabelas.Epi.create({ tipo, marca, nome, ca, validade })
        res.status(201).send({ epiCriada })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao cadastrar EPI' })
    }
}

const postUsuario = async (req, res) => {


    try {
        const { nome, senha, email } = req.body
        console.log(req.body)
        if (!nome || !senha || !email) return res.status(404).send({ mensagem: 'Campos incompletos' })
        const usuarioCriado = await tabelas.Cadastro.create({ nome, senha, email })
        res.status(201).send({ usuarioCriado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao cadastrar Usuario' })
    }

}


const postFuncionario = async (req, res) => {

    try {
        const { nome, matricula, homogenio, setor } = req.body
        if (!nome || !matricula || !homogenio || !setor) return res.status(404).send({ mensagem: 'Campos incompletos' })
        const funcionarioCriado = await tabelas.Funcionarios.create({ nome, matricula, homogenio, setor })
        res.status(201).send({ funcionarioCriado })

    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao cadastrar Funcionario' })
    }
}

const postEmprestimo = async (req, res) => {
    try {
        const { nomeFuncionario, matricula, epi, dataRetirada, dataDevolucao } = req.body
        if (!nomeFuncionario || !matricula || !epi || !dataRetirada || !dataDevolucao) return res.status(404).send({ mensagem: 'Campos incompletos' })
        const emprestimoCriado = await tabelas.Emprestimos.create({ nomeFuncionario, matricula, epi, dataRetirada, dataDevolucao })
        res.status(201).send({ emprestimoCriado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao cadastrar Emprestimo' })
    }

}


//DELETE'S

const deleteApagarEpi = async (req, res) => {
    try {
        let arrayDelete = req.params.ca.split(',')
        console.log(arrayDelete)
        const epiApagada = await tabelas.Epi.destroy({
            where: {
                ca: arrayDelete
            },
        })
        res.status(200).send({ mensagem: "EPI apagada", })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao deletar EPI' })
    }
}

const deleteApagarFuncionarios = async (req, res) => {
    try {
        let arrayDelete = req.params.matricula.split(',')
        console.log(arrayDelete)
        const funcApagada = await tabelas.Funcionarios.destroy({
            where: {
                matricula: arrayDelete
            },
        })
        res.status(200).send({ mensagem: "Funcionario apagado" })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao deletar Funcionario' })
    }
}


const deleteApagarEmprestimos = async (req, res) => {
    try {
        const { id } = req.params
        const emprestimoApagado = await tabelas.Emprestimos.destroy({
            where: {
                id: id
            },
        })
        res.status(200).send({ mensagem: "Emprestimo apagado" })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao deletar Emprestimo' })
    }
}

//PUT'S

const putAtualizarEpi = async (req, res) => {
    try {
        const ca = req.params.ca
        const info = req.body
        const epiAtualizada = await tabelas.Epi.update(info, {
            where: {
                ca: ca
            }
        })
        res.status(201).send({ epiAtualizada })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao atualizar o EPI' })
    }
}

const putAtualizarFuncionario = async (req, res) => {
    try {
        const matricula = req.params.funcionario
        const info = req.body
        console.log(info)
        const funcionarioAtualizado = await tabelas.Funcionarios.update(info, {
            where: {
                matricula: matricula
            }
        })
        res.status(201).send({ funcionarioAtualizado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao atualizar o funcionario' })
    }
}

const putAtualizarEmprestimos = async (req, res) => {
    try {
        const id = req.params.id
        const info = req.body
        const emprestimoAtualizado = await tabelas.Emprestimos.update(info, {
            where: {
                id: id
            }
        })
        res.status(201).send({ emprestimoAtualizado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao atualizar o emprestimo' })
    }
}




export default { postVerify, getUsuarioNome, getUsuarios, postUsuario, getEpi, getEmprestimos, getFuncionarios, postEmprestimo, postEpi, postFuncionario, deleteApagarEmprestimos, deleteApagarEpi, deleteApagarFuncionarios, putAtualizarEmprestimos, putAtualizarEpi, putAtualizarFuncionario }