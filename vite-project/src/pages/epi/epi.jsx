import { useState, useEffect } from "react";
import Table from "../../component/table";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import InputTextDefault from "../../component/inputTextDefault";
import moment from "moment";


const Epi = () => {
    const [tipo, setTipo] = useState("")
    const [marca, setMarca] = useState("")
    const [nome, setNome] = useState("")
    const [ca, setCa] = useState("")
    const [datav, setDatav] = useState("")
    const [data, setData] = useState([])

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


    const handleClickGet = async () => {

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

                let filtro = responseData.filter((x) => x.nome == nome || x.ca == ca || x.tipo == tipo || x.marca == marca || x.validade == datav)

                const objectsData = filtro.map((element) => {
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
            })
            .catch((error) => {
                console.log(error);
            });

    };



    return (
        <div>
            <InputTextDefault
                info={{
                    id: "tipo",
                    placeholder: "Tipo",
                    func: setTipo,
                    value: tipo
                }}
            />
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
            <div style={{
                position: "fixed",
                top: "25%",
                left: "10%",
            }} >
                {data.length > 0 &&
                    <Table columns={columns} data={data} />}
            </div>
            <button onClick={handleClickGet}>Pesquisa</button>
        </div>

    )
}

export default Epi