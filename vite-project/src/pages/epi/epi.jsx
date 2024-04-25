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
                setTipo(tipoData)
            })
            .catch((error) => {
                console.log(error);
            });
    })

    const handleClickGet = async () => {
        let x = datav.split("/")
        let date = x[2] + "-" + x[1] + "-" + x[0]
        let date2 = date + "T00:00:00.000Z"
        let filtro = data.filter((x) => x.nome == nome || x.ca == ca || x.tipo == tipoSelect || x.marca == marca || x.validade == date2)
        setFilter(filtro)
        console.log(data)

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
        // let filtroCadastroTipo = data.filter((x) => x.tipo == tipoModalCadastro)
        // let filtroCadastroMarca = data.filter((x) => x.marca == marcaModalCadastro)
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

    const handleClickPut = async () => {

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
            <InputTextDefault
                info={{
                    id: "marca",
                    placeholder: "Marca",
                    func: setMarca,
                    value: marca
                }}
            />
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
                    <Table columns={columns} data={filter} select={true} />}
            </div>
            <button onClick={handleClickGet}>Pesquisa</button>
        </div>

    )
}

export default Epi