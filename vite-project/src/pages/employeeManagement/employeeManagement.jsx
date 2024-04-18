import BigButton from "../../component/bigButton/index";
import InputTextDefault from "../../component/inputTextDefault/index";
import { useState, useEffect } from "react";
import Dropdown from "../../component/dropdown";
import Table from "../../component/table";
import axios from "axios";

const EmployeeManagement = () => {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState();
  const [grupo, setGrupo] = useState();
  const [data,setData] = useState ([])

  const columns = [
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
      name: "Nome",
      selector: (row) => row.nome,
      sortable: true,
      filter: true,
      id: "nome",
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

  const click = () => {};
  useEffect(() => {
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
            grupo: element.homogeneo,
            setor: element.setor,
          };
        });
        console.log(objectsData);
        setData(objectsData)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Dropdown
        placeholder={"Setor"}
        selectedOption={setor}
        setSelectOption={setSetor}
        options={[]}
      />
      <Dropdown
        placeholder={"Grupo"}
        selectedOption={grupo}
        setSelectOption={setGrupo}
        options={[]}
      />
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

      <div style={{ padding: "20px" }}>
        <BigButton text={"AAAAAAAAAAA"} onClick={click} />
        <Table columns={columns} data={data} select={true} />
      </div>
    </div>
  );
};

export default EmployeeManagement;
