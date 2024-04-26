import { useState } from "react";
import RegisterForm from "../../component/register";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {

    let responseVerify = verifyPassword()
    if (responseVerify == true) {
      return
    }
    let data = JSON.stringify({
      nome: user,
      senha: password,
      email: email
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
      alert("Cadastro realizado com sucesso")
      navigate('/login')
  };



  const verifyPassword = () => {
    if (password == password2) {
      return false
    } else {
      alert("Senhas não são identicas")
      return true
    }
  }

  const verifyUserDuplicate = async () => {

    let config2 = {
      method: 'get',
      url: `http://localhost:3000/getUsuarioNome/${user}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(user)
    };

    let verify = axios.request(config2)
      .then((response) => {
        console.log(response.data)
        if (response.data.tabela.length > 0) {
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
    <div id="content">
      <RegisterForm
        info={{
          setPassword2: setPassword2,
          password2: password2,
          password: password,
          email: email,
          setEmail: setEmail,
          setPassword: setPassword,
          setUser: setUser,
          user: user
        }}
        click={handleClick} />

<div id="imagem">
<img src="https://smslabore.com.br/wp-content/uploads/2017/10/Labore-Consuloria-EPI-Placa.png"  width="360" height="380"/>
</div>

<div className="RodaPe">
<h1>bbbbbbbbb</h1>
</div>

    </div>
  );
};

export default Register;
