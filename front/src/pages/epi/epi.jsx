import { useState, useEffect } from "react";
import Table from "../../component/table";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import InputTextDefault from "../../component/inputTextDefault";
import ModalCadastro from "../../component/modalCadastrarEpi/index.jsx"
import ModalEditar from "../../component/modalEditarEpi/index.jsx";
import Dropdown from "../../component/dropdown/index.jsx";
import moment from "moment";


const Epi = () => {
    const [tipo, setTipo] = useState("")
    const [marca, setMarca] = useState("")
    const [nome, setNome] = useState("")
    const [ca, setCa] = useState("")
    const [datav, setDatav] = useState("")
    const [data, setData] = useState([])
    const [tipoModalCadastro, setTipoModalCadastro] = useState("")
    const [marcaModalCadastro, setMarcaModalCadastro] = useState("")
    const [nomeModalCadastro, setNomeModalCadastro] = useState("")
    const [caModalCadastro, setCaModalCadastro] = useState("")
    const [datavModalCadastro, setDatavModalCadastro] = useState("")
    const [tipoModalEditar, setTipoModalEditar] = useState("")
    const [marcaModalEditar, setMarcaModalEditar] = useState("")
    const [nomeModalEditar, setNomeModalEditar] = useState("")
    const [caModalEditar, setCaModalEditar] = useState("")
    const [datavModalEditar, setDatavModalEditar] = useState("")
    const [filter, setFilter] = useState([])
    const [select, setSelect] = useState("")
    const [tipoSelect, setTipoSelect] = useState("")
    const [marcaSelect, setMarcaSelect] = useState("")

    const navigate = useNavigate()

    const columns = [
        {
            name: "Tipo",
            selector: (row) => row.tipo,
            sortable: true,
            filter: true,
            id: "tipo",
            width: "200px",
        },
        {
            name: "Marca",
            selector: (row) => row.marca,
            sortable: true,
            filter: true,
            id: "marca",
            width: "200px",
        },
        {
            name: "Nome",
            selector: (row) => row.nome,
            sortable: true,
            filter: true,
            id: "nome",
            width: "200px",
        },
        {
            name: "CA",
            selector: (row) => row.ca,
            sortable: true,
            filter: true,
            width: "200px"                       // added line here

        },
        {
            name: "Validade",
            selector: (row) => row.validade,
            sortable: true,
            filter: true,
            // Define uma função de filtro personalizada para a coluna de data

        },
    ];
    useEffect(() => {
        getAllData()
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

    const getAllData = (() => {
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
                console.log(responseData)

                const objectsData = responseData.map((element) => {
                    let date = element.validade;
                    date = moment(date);
                    date = date.utc().format("DD/MM/YYYY");
                    return ({
                        tipo: element.tipo,
                        marca: element.marca,
                        nome: element.nome,
                        ca: element.ca,
                        validade: date
                    });
                });
                setData(objectsData)

                const tipoData = objectsData.map((element) => {
                    return {
                        value: element.tipo,
                        label: element.tipo,
                    };
                });
                const marcaData = objectsData.map((element) => {
                    return {
                        value: element.marca,
                        label: element.marca,
                    };
                });

                // Chamando a função para remover itens duplicados
                const tipoDataSemDuplicados = removerItensDuplicados(tipoData);
                const marcaDataSemDuplicados = removerItensDuplicados(marcaData);
                setTipo(tipoDataSemDuplicados)
                setMarca(marcaDataSemDuplicados)
            })
            .catch((error) => {
                console.log(error);
            });
    })

    const handleClickGet = async () => {
        let x = datav.split("/")
        let date = x[2] + "-" + x[1] + "-" + x[0]
        let date2 = date + "T00:00:00.000Z"
        let filtro = data.filter((x) => x.nome == nome || x.ca == ca || x.tipo == tipoSelect || x.marca == marcaSelect || x.validade == date2)
        setFilter(filtro)

    };

    const handleClickPost = async () => {

        let x = datavModalCadastro.split("/")
        let date = x[2] + "-" + x[1] + "-" + x[0]
        let date2 = date + "T00:00:00.000Z"
        console.log(date)
        console.log(date2)
        let datacadastro = JSON.stringify({
            tipo: tipoModalCadastro,
            marca: marcaModalCadastro,
            nome: nomeModalCadastro,
            ca: caModalCadastro,
            validade: date2
        });

        let config = {
            method: 'post',
            url: `http://localhost:3000/cadastrarEpi`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: datacadastro
        }
        let filtroCadastroCa = data.filter((x) => x.ca == caModalCadastro)
        if (filtroCadastroCa.length > 0) {
            return alert('CA já existente')
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
    const handleClickDelete = async () => {
        const objectsData = select.map((element) => {
            return (element.ca);
        });
        console.log(objectsData)
        let config = {
            method: 'delete',
            url: `http://localhost:3000/deleteEpi/${objectsData}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        alert("Remoção realizada com sucesso")
        getAllData()
    }

    const handleClickPut = async () => {
        if (select.length > 1 || select.length == 0) {
            return alert("Selecione apenas um para editar.")
        }

        let x = datavModalEditar.split("/")
        let date = x[2] + "-" + x[1] + "-" + x[0]
        let date2 = date + "T00:00:00.000Z"
        console.log(date)
        console.log(date2)

        let data = JSON.stringify({
            tipo: tipoModalEditar,
            marca: marcaModalEditar,
            nome: nomeModalEditar,
            ca: caModalEditar,
            validade: date2
        });
        console.log(data)

        let config = {
            method: 'put',
            url: `http://localhost:3000/editarEpi/${caModalEditar}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        }

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        alert("Edição realizada com sucesso")
        getAllData()
    }

    return (
        <div>
            {tipo.length > 0 && (
                <Dropdown
                    placeholder={"Tipo"}
                    selectedOption={tipoSelect}
                    setSelectOption={setTipoSelect}
                    options={tipo}
                />)
            }

            {marca.length > 0 && (
                <Dropdown
                    placeholder={"Marca"}
                    selectedOption={marcaSelect}
                    setSelectOption={setMarcaSelect}
                    options={marca}
                />)
            }

            <InputTextDefault
                info={{
                    id: "nome",
                    placeholder: "Nome",
                    func: setNome,
                    value: nome
                }}
            />
            <InputTextDefault
                info={{
                    id: "ca",
                    placeholder: "CA",
                    func: setCa,
                    value: ca
                }}
            />
            <InputTextDefault
                info={{
                    id: "validade",
                    placeholder: "Data de validade",
                    func: setDatav,
                    value: datav
                }}
            />
            <ModalCadastro
                info={{
                    metodo: "Cadastrar",
                    titulo: "Cadastro",

                    idTipo: "tipoModalCadastro",
                    placeholderTipo: "Tipo",
                    funcTipo: setTipoModalCadastro,
                    valueTipo: tipoModalCadastro,

                    idMarca: "marcaModalCadastro",
                    placeholderMarca: "Marca",
                    funcMarca: setMarcaModalCadastro,
                    valueMarca: marcaModalCadastro,

                    idNome: "nomeModalCadastro",
                    placeholderNome: "Nome",
                    funcNome: setNomeModalCadastro,
                    valueNome: nomeModalCadastro,

                    idCa: "caModalCadastro",
                    placeholderCa: "CA",
                    funcCa: setCaModalCadastro,
                    valueCa: caModalCadastro,

                    idDatav: "validadeModalCadastro",
                    placeholderDatav: "Data de validade",
                    funcDatav: setDatavModalCadastro,
                    valueDatav: datavModalCadastro,

                    cadastrar: handleClickPost

                }}
            />

            <ModalEditar
                info={{
                    select: select,
                    metodo: "Editar",
                    titulo: "Editar",

                    idTipo: "tipoModalEditar",
                    placeholderTipo: "Tipo",
                    funcTipo: setTipoModalEditar,
                    valueTipo: tipoModalEditar,

                    idMarca: "marcaModalEditar",
                    placeholderMarca: "Marca",
                    funcMarca: setMarcaModalEditar,
                    valueMarca: marcaModalEditar,

                    idNome: "nomeModalEditar",
                    placeholderNome: "Nome",
                    funcNome: setNomeModalEditar,
                    valueNome: nomeModalEditar,

                    idCa: "caModalEditar",
                    placeholderCa: "CA",
                    funcCa: setCaModalEditar,
                    valueCa: caModalEditar,

                    idDatav: "validadeModalEditar",
                    placeholderDatav: "Data de validade",
                    funcDatav: setDatavModalEditar,
                    valueDatav: datavModalEditar,

                    editar: handleClickPut

                }}
            />
            <div style={{
                position: "fixed",
                top: "25%",
                left: "10%",
            }} >
                {filter.length == 0 &&
                    <Table columns={columns} data={data} select={true} selectFunc={setSelect} />

                }
                {filter.length > 0 &&
                    <Table columns={columns} data={filter} select={true} selectFunc={setSelect} />}
            </div>
            <button onClick={handleClickGet}>Pesquisa</button>
            <button onClick={handleClickDelete}>Apagar</button>
        </div>

    )
}

export default Epi