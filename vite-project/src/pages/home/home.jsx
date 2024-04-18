import { useState, useEffect } from "react";
import Table from "../../component/table";
import axios from "axios";
import moment from "moment";
import "./home.css";
import Card from "../../component/card";
const Home = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("AAAAAAAAAAAAA");

  const columns = [
    {
      name: "Funcionário",
      selector: (row) => row.funcionaio,
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
      width: "200px", // added line here
    },
    {
      name: "Vencimento",
      selector: (row) => row.vencimento,
      sortable: true,
      filter: true,
      // Define uma função de filtro personalizada para a coluna de data
    },
  ];

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:3000/emprestimos",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        let responseData = response.data.tabela;
        const objectsData = responseData.map((element) => {
          let date = element.dataDevolucao;
          date = moment(date);
          date = date.format("DD/MM/YYYY");
          return {
            funcionaio: element.nomeFuncionario,
            epi: element.epi,
            vencimento: date,
          };
        });
        setData(objectsData);
        console.log(objectsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "25%",
          left: "10%",
        }}
      >
        <Table columns={columns} data={data} select={true} />
      </div>
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Card name={"Gerenciar EPI"} route={"gerenciarEpi"} />
        <Card name={"Gerenciar funcionário"} route={"gerenciarFuncionario"} />
        <Card name={"Gerenciar empréstimo"} route={"gerenciarEmprestimo"} />
        <Card name={"Histórico"} route={"historico"} />
      </div>
    </div>
  );
};

export default Home;
