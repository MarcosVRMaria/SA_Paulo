import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleClick = () => {
    let data = {
      nome: "x",
      senha: "1234"
    };
    
    let config = {
      method: 'post',
      url: 'http://localhost:3000/cadastrarUsuario',
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div>
      <input
        type="text"
        id="user"
        required
        minLength="3"
        placeholder="Usuário"
        onChange={(e) => setUser(e.target.value)}
        value={user}
      />
      <input
        type="password"
        id="password"
        required
        minLength="6"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleClick}>Cadastrar</button>
    </div>
  );
};

export default RegisterForm;
