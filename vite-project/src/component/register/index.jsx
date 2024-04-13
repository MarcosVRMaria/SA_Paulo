import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [password2, setPassword2] = useState("");
  const [responseUser,SetResponseUser ] = useState("")

  const handleClick = async () => {

    let responseVerify = verifyPassword()
    if (responseVerify == true) {
      return
    }
    let data = JSON.stringify({
      nome: user,
      senha: password
    });

    let config = {
      method: 'post',
      url: 'http://localhost:3000/cadastrarUsuario',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
  
    let verifyUser = await verifyUserDuplicate()

    console.log(verifyUser)
    if (verifyUser == true) {
      return
    }
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const verifyPassword = () => {
    if (password == password2) {
      return false
    } else {
      alert("Senhas não são identicas")
      return true
    }
  }

  const  verifyUserDuplicate = async () => {

    let config2 = {
      method: 'get',
      url: `http://localhost:3000/getUsuarios/${user}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(user)
    };

    let verify = axios.request(config2)
      .then((response) => {
        console.log(response.data)
        if (response.data.tabela.length>0) {
          alert('Usuario já cadastrado')
          return true
        }
      })
      .catch((error) => {
        console.log(error);
      });
return verify

  }

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
      <input
        type="password"
        id="password2"
        required
        minLength="6"
        placeholder="Confirme Senha"
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
      />
      <button onClick={handleClick}>Cadastrar</button>
    </div>
  );
};

export default RegisterForm;
