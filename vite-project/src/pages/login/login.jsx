import { useState } from "react";
import LoginForm from "../../component/login";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    const handleClick = async () => {

        let data = JSON.stringify({
            user: user,
            password: password,
        });

        let config = {
            method: 'post',
            url: `http://localhost:3000/authLogin`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        }
        axios.request(config)
            .then((response) => {
                console.log(response.data);
                if (response.data == true) {
                    navigate("/home");
                } else {
                    alert("Usuario ou senha incorreto")
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div id="content">
            <LoginForm
                info={{
                    password: password,
                    setPassword: setPassword,
                    setUser: setUser,
                    user: user
                }}
                click={handleClick} />
<div id="imagem">
<img src="https://smslabore.com.br/wp-content/uploads/2017/10/Labore-Consuloria-EPI-Placa.png"  width="320" height="300"/>
</div>
<div className="RodaPe">
<h1>aaaaaaa</h1>

</div>
        </div>
    );
}

export default Login