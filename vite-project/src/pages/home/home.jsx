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
          date = date.utc().format("DD/MM/YYYY");
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
    <div className="content-home">
      <div
        style={{
          position: "fixed",
          top: "25%",
          left: "10%",
        }}
        id="coluna-home"
      >
        <Table columns={columns} data={data} select={true} />
      </div>
      <div>
        
        <div className="content-bnt-home">
          
        <div className="bnt-epi">
        <Card name={"Gerenciar EPI"} route={"/epi"} />
        </div>
        <div className="bnt-funcionario">
        <Card name={"Gerenciar funcionário"} route={"/funcionarios"} />
        </div>
        <div className="bnt-emprestimo">
        <Card name={"Gerenciar empréstimo"} route={"/emprestimos"} />
        </div>
        <div className="bnt-historico">
        <Card name={"Histórico"} route={"/historico"} />
        </div>
        </div>
      </div>
      <div className="RodaPe">
        <h1>ccccccccc</h1>
      </div>
      </div>
  );
};

export default Home;
