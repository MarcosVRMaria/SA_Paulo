import { useState, useEffect } from "react";
import Table from "../../component/table/index.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import InputTextDefault from "../../component/inputTextDefault/index.jsx";
import Dropdown from "../../component/dropdown/index.jsx";
import moment from "moment";
import ModalCadastro from "../../component/modalCadastroEmprestimo/index.jsx";
import ModalFinalizar from "../../component/modalDevolucaoEmprestimo/index.jsx";

const Emprestimos = () => {
    const [tipo, setTipo] = useState("")
    const [marca, setMarca] = useState("")
    const [nome, setNome] = useState("")
    const [epi, setEpi] = useState("")
    const [ca, setCa] = useState("")
    const [datad, setDatad] = useState("")
    const [datar, setDatar] = useState("")
    const [matricula, setMatricula] = useState("")
    const [matriculasEmprestimos, setMatriculasEmprestimos] = useState("")
    const [epiFinalizar, setEpiFinalizar] = useState("")
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [nomeModalCadastro, setNomeModalCadastro] = useState("")
    const [matriculaModalCadastro, setMatriculaModalCadastro] = useState("")
    const [matriculaModalFinalizar, setMatriculaModalFinalizar] = useState("")
    const [epiModalFinalizar, setEpiModalFinalizar] = useState("")
    const [epiModalCadastro, setEpiModalCadastro] = useState("")
    const [datarModalCadastro, setDatarModalCadastro] = useState("")
    const [datadModalCadastro, setDatadModalCadastro] = useState("")
    const [filter, setFilter] = useState([])
    const [select, setSelect] = useState("")
    const [tipoSelect, setTipoSelect] = useState("")
    const [marcaSelect, setMarcaSelect] = useState("")
    const [funcionaio, setFuncionaio] = useState("")


    const navigate = useNavigate()

    const columns = [
        {
            name: "Matricula",
            selector: (row) => row.matricula,
            sortable: true,
            filter: true,
            id: "matricula",
            width: "200px",
        },
        {
            name: "Funcionário",
            selector: (row) => row.nome,
            sortable: true,
            filter: true,
            id: "funcionario",
            width: "200px",
        },
        {
            name: "EPI",
            selector: (row) => row.epi,
            sortable: true,
            filter: true,
            id: "epi",
            width: "200px",
        },
        {
            name: "Data de retirada",
            selector: (row) => row.dater,
            sortable: true,
            filter: true,
            width: "200px"                       // added line here

        },
        {
            name: "Data de devolução",
            selector: (row) => row.dated,
            sortable: true,
            filter: true,
            // Define uma função de filtro personalizada para a coluna de data

        },
    ];
    useEffect(() => {
        getAllData()
        getAllTables()
    }, [])

    // Função para remover itens duplicados do array de objetos
    const removerItensDuplicados = (array) => {
        // Use um conjunto para manter apenas os objetos únicos
        const conjunto = new Set();
        return array.filter(obj => {
            // Converta cada objeto em uma string para verificar sua unicidade
            const objetoString = JSON.stringify(obj);
            const objetoJaVisto = conjunto.has(objetoString);
            if (!objetoJaVisto) {
                conjunto.add(objetoString);
                return true;
            }
            return false;
        });
    }


    const getAllTables = (() => {
        let config = {
            method: 'get',
            url: `http://localhost:3000/epi`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios.request(config)
            .then((response) => {
                let responseData = response.data.tabela;
                const objectsData1 = responseData.map((element) => {
                    return ({
                        nome: element.nome,
                    });
                });
                const epiData = objectsData1.map((element) => {
                    return {
                        value: element.nome,
                        label: element.nome,
                    };
                });
                // Chamando a função para remover itens duplicados
                const epiDataSemDuplicados = removerItensDuplicados(epiData);
                setEpi(epiDataSemDuplicados)
            })
            .catch((error) => {
                console.log(error);
            });
        let config1 = {
            method: "get",
            url: "http://localhost:3000/funcinarios",
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .request(config1)
            .then((response) => {
                let responseData = response.data.tabela;
                const objectsData2 = responseData.map((element) => {
                    return {
                        funcionaio: element.nome,
                        matricula: element.matricula,
                    };
                });
                const funcionaioData = objectsData2.map((element) => {
                    return {
                        value: element.funcionaio,
                        label: element.funcionaio,
                    };
                });
                const matriculaData = objectsData2.map((element) => {
                    return {
                        value: element.matricula,
                        label: element.matricula,
                    };
                });

                // Chamando a função para remover itens duplicados
                const funcionaioDataSemDuplicados = removerItensDuplicados(funcionaioData);
                const matriculaDataSemDuplicados = removerItensDuplicados(matriculaData);

                setNome(funcionaioDataSemDuplicados);
                setMatricula(matriculaDataSemDuplicados);

            })
            .catch((error) => {
                console.log(error)
            });

    })

    const getAllData = (() => {
        let config = {
            method: 'get',
            url: `http://localhost:3000/emprestimos`,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios.request(config)
            .then((response) => {
                let responseData = response.data.tabela;
                // console.log(responseData)
                const objectsData = responseData.map((element) => {
                    let dated = element.dataDevolucao;
                    dated = moment(dated);
                    dated = dated.utc().format("DD/MM/YYYY");
                    let dater = element.dataRetirada
                    dater = moment(dater);
                    dater = dater.utc().format("DD/MM/YYYY");
                    return ({
                        nome: element.nomeFuncionario,
                        matricula: element.matricula,
                        epi: element.epi,
                        dater: dater,
                        dated: dated,
                    });
                });
                // console.log(objectsData)
                setData(objectsData)
                const epiEmprestimos = objectsData.map((element) => {
                    return ({
                        epi: element.epi
                    })
                })
                const epiData = epiEmprestimos.map((element) => {
                    return ({
                        value: element.epi,
                        label: element.epi
                    })
                })
                const matriculaEmprestimos = objectsData.map((element) => {
                    return ({
                        matricula: element.matricula
                    })
                })

                const matriculaData2 = matriculaEmprestimos.map((element) => {
                    return {
                        value: element.matricula,
                        label: element.matricula,
                    };
                });

                // Chamando a função para remover itens duplicados
                const matriculaDataSemDuplicados2 = removerItensDuplicados(matriculaData2);
                setEpiFinalizar(epiData)
                setMatriculasEmprestimos(matriculaDataSemDuplicados2);

            })
            .catch((error) => {
                console.log(error);
            });
    })

    const handleClickGet = async () => {
        let filtro = data.filter((x) => x.nome == nome || x.matricula == matricula || x.epi == epi || x.dater == datar || x.dated == datad)
        setFilter(filtro)
        console.log(data)
    };

    const handleClickPost = async () => {
        getAllTables()

        let x = datadModalCadastro.split("/")
        let dated = x[2] + "-" + x[1] + "-" + x[0]
        let dated2 = dated + "T00:00:00.000Z"

        let y = datarModalCadastro.split("/")
        let dater = y[2] + "-" + y[1] + "-" + y[0]
        let dater2 = dater + "T00:00:00.000Z"

        let datacadastro = JSON.stringify({
            matricula: matriculaModalCadastro,
            nomeFuncionario: nomeModalCadastro,
            epi: epiModalCadastro,
            dataRetirada: dater2,
            dataDevolucao: dated2
        });

        let config = {
            method: 'post',
            url: `http://localhost:3000/cadastrarEmprestimo`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: datacadastro
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        alert("Cadastro realizado com sucesso")
        getAllData()

    }
    return (
        <div>
            <InputTextDefault
                info={{
                    id: "nome",
                    placeholder: "Funcionario",
                    func: setNome,
                    value: nome
                }}
            />
            <InputTextDefault
                info={{
                    id: "matricula",
                    placeholder: "Matricula",
                    func: setMatricula,
                    value: matricula
                }}
            />
            <InputTextDefault
                info={{
                    id: "epi",
                    placeholder: "EPI",
                    func: setEpi,
                    value: epi
                }}
            />
            <InputTextDefault
                info={{
                    id: "dataRetirada",
                    placeholder: "Data de Retirada",
                    func: setDatar,
                    value: datar
                }}
            />
            <InputTextDefault
                info={{
                    id: "dataDevolucao",
                    placeholder: "Data de devolução",
                    func: setDatad,
                    value: datad
                }}
            />
            <ModalCadastro
                info={{
                    metodo: "Cadastrar",
                    titulo: "Cadastro",

                    epiSelect: epiModalCadastro,
                    setEpiSelect: setEpiModalCadastro,
                    epi: epi,

                    nomeSelect: nomeModalCadastro,
                    setNomeSelect: setNomeModalCadastro,
                    nome: nome,

                    matriculaSelect: matriculaModalCadastro,
                    setMatriculaSelect: setMatriculaModalCadastro,
                    matricula: matricula,

                    idDatar: "dataRetirada",
                    placeholderDatar: "Data de Retirada",
                    funcDatar: setDatarModalCadastro,
                    valueDatar: datarModalCadastro,

                    idDatad: "dataDevolucao",
                    placeholderDatad: "Data maximo para Devolução",
                    funcDatad: setDatadModalCadastro,
                    valueDatad: datadModalCadastro,


                    cadastrar: handleClickPost

                }}
            />
            <ModalFinalizar
                info={{
                    metodo: "Finalizar Empréstimo",
                    titulo: "Finalização de Empréstimos",

                    matriculaSelect: matriculaModalFinalizar,
                    setMatriculaSelect: setMatriculaModalFinalizar,
                    matricula: matriculasEmprestimos,

                    emprestimoSelect: epiModalFinalizar,
                    setEmprestimosSelect: setEpiModalFinalizar,
                    emprestimo: epiFinalizar

                }}
            />
            <div style={{
                position: "fixed",
                top: "25%",
                left: "10%",
            }} >
                {filter.length == 0 &&
                    <Table columns={columns} data={data} />
                }
                {filter.length > 0 &&
                    <Table columns={columns} data={filter} />}
            </div>
            <button onClick={handleClickGet}>Pesquisa</button>
        </div>
    )
}

export default Emprestimos