import BigButton from "../../component/bigButton/index";
import InputTextDefault from "../../component/inputTextDefault/index";
import { useState, useEffect } from "react";
import Dropdown from "../../component/dropdown";
import Table from "../../component/table";
import SearchButton from "../../component/searchbutton";
import ModalCadastroFuncionario from "../../component/modalCadastroFuncionario";
import axios from "axios";

const EmployeeManagement = () => {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [data, setData] = useState([]);
  const [userChoiceSetor, setUserChoiceSetor] = useState("");
  const [userChoiceGrupo, setUserChoiceGrupo] = useState("");
  const [filter, setFilter] = useState([])
  const [tableChoice, setTableChoice] = useState()


  const [setorModalCadastro, setSetorModalCadastro] = useState("")
  const [grupoModalCadastro, setGrupoModalCadastro] = useState("")
  const [nomeModalCadastro, setNomeModalCadastro] = useState("")
  const [matriculaModalCadastro, setMatriculaModalCadastro] = useState("")

  const columns = [
    {
      name: "Nome",
      selector: (row) => row.funcionaio,
      sortable: true,
      filter: true,
      id: "nome",
      width: "200px",
    },
    {
      name: "Setor",
      selector: (row) => row.setor,
      sortable: true,
      filter: true,
      id: "setor",
      width: "200px",
    },

    {
      name: "Grupo Homogêneo",
      selector: (row) => row.grupo,
      sortable: true,
      filter: true,
      id: "grupo",
      width: "200px",
    },
    {
      name: "Matrícula",
      selector: (row) => row.matricula,
      sortable: true,
      filter: true,
      id: "matricula",
      width: "200px",
    },
  ];

  useEffect(() => {
    getAllData()
  }, [data]);

  const getAllData = () => {
    let config = {
      method: "get",
      url: "http://localhost:3000/funcinarios",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        let responseData = response.data.tabela;
        const objectsData = responseData.map((element) => {
          return {
            funcionaio: element.nome,
            matricula: element.matricula,
            grupo: element.homogenio,
            setor: element.setor,
          };
        });
        const setorData = objectsData.map((element) => {
          return {
            value: element.setor,
            label: element.setor,
          };
        });
        const grupoData = objectsData.map((element) => {
          return {
            value: element.grupo,
            label: element.grupo,
          };
        });
        setGrupo(grupoData);
        setSetor(setorData);
        setData(objectsData);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const search = () => {
    filtro();
  };

  const handleClickPost = async () => {

    let filtroCadastro = data.filter((element) => element.matricula == matriculaModalCadastro)
    console.log(filtroCadastro)
    if (filtroCadastro.length > 0) {
      return alert("Matrícula já existente")

    }
    let dataPost = JSON.stringify({
      nome: nomeModalCadastro,
      matricula: matriculaModalCadastro,
      homogenio: grupoModalCadastro,
      setor: setorModalCadastro
    });

    let config = {
      method: 'post',
      url: `http://localhost:3000/cadastrarFuncionario`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataPost
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    getAllData()
    alert("Cadastro realizado com sucesso")
  }

  const filtro = () => {
    let filtro = data.filter(
      (element) => element.setor == userChoiceSetor || element.grupo == userChoiceGrupo || element.funcionaio == nome || element.matricula == matricula);
    setFilter(filtro)
  };
  return (
    <div>
      {setor.length > 0 && (
        <Dropdown
          placeholder={"Setor"}
          selectedOption={userChoiceSetor}
          setSelectOption={setUserChoiceSetor}
          options={setor}
        />
      )}
      {grupo.length > 0 && (
        <Dropdown
          placeholder={"Grupo"}
          selectedOption={userChoiceGrupo}
          setSelectOption={setUserChoiceGrupo}
          options={grupo}
        />
      )}
      <InputTextDefault
        info={{
          id: "Nome",
          placeholder: "Nome",
          value: nome,
          func: setNome,
        }}
      />
      <InputTextDefault
        info={{
          id: "matricula",
          placeholder: "Matrícula",
          value: matricula,
          func: setMatricula,
        }}
      />
      <SearchButton onClick={search} />

      <div style={{ padding: "20px" }}>
        {filter.length == 0 &&
          <Table columns={columns} data={data} select={true} selectFunc={setTableChoice} />}
        {filter.length > 0 &&
          <Table columns={columns} data={filter} select={true} selectFunc={setTableChoice} />}
      </div>
      <ModalCadastroFuncionario
        info={{
          metodo: "Cadastrar",
          titulo: "Cadastro",

          idSetor: "setorModalCadastro",
          placeholderSetor: "Setor",
          funcSetor: setSetorModalCadastro,
          valueSetor: setorModalCadastro,

          idGrupo: "grupoModalCadastro",
          placeholderGrupo: "Grupo",
          funcGrupo: setGrupoModalCadastro,
          valueGrupo: grupoModalCadastro,

          idNome: "nomeModalCadastro",
          placeholderNome: "Nome",
          funcNome: setNomeModalCadastro,
          valueNome: nomeModalCadastro,

          idMatricula: "matriculaModalCadastro",
          placeholderMatricula: "Matrícula",
          funcMatricula: setMatriculaModalCadastro,
          valueMatricula: matriculaModalCadastro,
          cadastrar: handleClickPost

        }} />
      <BigButton text={"Editar"} />
      <BigButton text={"Remover"} />
    </div>
  );
};

export default EmployeeManagement;
