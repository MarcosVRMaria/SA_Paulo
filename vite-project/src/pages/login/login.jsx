import { useState } from "react";
import LoginForm from "../../component/login";
import axios from "axios";
import { useNavigate } from "react-router-dom"

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
        <div>
            <LoginForm
                info={{
                    password: password,
                    setPassword: setPassword,
                    setUser: setUser,
                    user: user
                }}
                click={handleClick} />

        </div>
    );
}

export default Login