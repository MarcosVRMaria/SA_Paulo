import { useState, useEffect } from "react";
import Table from "../../component/table/index.jsx";
import axios from "axios";
import moment from "moment";
import InputTextDefault from "../../component/inputTextDefault/index.jsx";
import Dropdown from "../../component/dropdown/index.jsx";
import { useNavigate } from "react-router-dom"


const Historico = () => {

    const [nome, setNome] = useState("")
    const [epi, setEpi] = useState("")
    const [datad, setDatad] = useState("")
    const [datar, setDatar] = useState("")
    const [matricula, setMatricula] = useState("")
    const [matriculasEmprestimos, setMatriculasEmprestimos] = useState("")
    const [epiFinalizar, setEpiFinalizar] = useState("")
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])


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
                        delete: element.delete
                    });
                });
                console.log(objectsData)
                let filtro = objectsData.filter((x) => x.delete == true)
                setData(filtro)
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
                const epiDataSemDuplicados2 = removerItensDuplicados(epiData)
                setEpiFinalizar(epiDataSemDuplicados2)
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

    return (
        <div>
            {epiFinalizar.length > 0 && (
                <Dropdown
                    placeholder={"EPI"}
                    selectedOption={epi}
                    setSelectOption={setEpi}
                    options={epiFinalizar}
                />)
            }

            {matriculasEmprestimos.length > 0 && (
                <Dropdown
                    placeholder={"Matricula"}
                    selectedOption={matricula}
                    setSelectOption={setMatricula}
                    options={matriculasEmprestimos}
                />)
            }
            <InputTextDefault
                info={{
                    id: "dataDevolucao",
                    placeholder: "Data de devolução",
                    func: setDatad,
                    value: datad
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

export default Historico