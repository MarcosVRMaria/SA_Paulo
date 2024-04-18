import BigButton from "../../component/bigButton/index";
import InputTextDefault from "../../component/inputTextDefault/index";
import { useState } from "react";
import Dropdown from "../../component/dropdown";
const EmployeeManagement = () => {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("Setor");
  const [grupo, setGrupo] = useState("Grupo Homogêneo");

  return (
    <>
      <div>

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
                <div>
        <Dropdown
          selectedOption={setor}
          setSelectOption={setSetor}
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
        />
        </div>
      </div>
      <BigButton text={"AAAAAAAAAAA"} onClick={() => console.log("AAAAAAAA")} />
    </>
  );
};

export default EmployeeManagement;
