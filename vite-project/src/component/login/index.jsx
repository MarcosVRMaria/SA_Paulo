import "./login.css"

const LoginForm = ({ info, click }) => {

    return (
        <div id="login-main">
            <div id="div_user">
            <input
                type="text"
                id="user"
                required
                minLength="3"
                placeholder="Usuário"
                onChange={(e) => info.setUser(e.target.value)}
                value={info.user}
            />
            </div>
            <input
                type="text"
                id="password"
                required
                minLength="3"
                placeholder="Senha"
                onChange={(e) => info.setPassword(e.target.value)}
                value={info.password}
            />
            <div id="bnt-div"> 
            <button  id="bnt" onClick={click}>Login</button>
            </div>
        </div>
    );
};

export default LoginForm;
