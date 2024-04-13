import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const Cadastro = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
},
    {
        updatedAt: false,
        createdAt: false
    })

const Funcionarios = sequelize.define('Funcionarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING
    },
    matricula: {
        type: DataTypes.STRING
    },
    homogenio: {
        type: DataTypes.STRING
    },
    setor: {
        type: DataTypes.STRING
    }
},
    {
        updatedAt: false,
        createdAt: false
    })

const Epi = sequelize.define('Epi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    ca: {
        type: DataTypes.STRING
    },
    validade: {
        type: DataTypes.DATE
    }
},
    {
        updatedAt: false,
        createdAt: false
    })

const Emprestimos = sequelize.define('Emprestimo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeFuncionario: {
        type: DataTypes.STRING
    },
    matricula: {
        type: DataTypes.STRING
    },
    epi: {
        type: DataTypes.STRING
    },
    dataRetirada: {
        type: DataTypes.DATE
    },
    dataDevolucao: {
        type: DataTypes.DATE
    }
},
    {
        updatedAt: false,
        createdAt: false
    })

export default { Emprestimos, Funcionarios, Epi, Cadastro }