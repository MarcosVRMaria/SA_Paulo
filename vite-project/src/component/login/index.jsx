const LoginForm = ({ info, click }) => {

    return (
        <div>
            <input
                type="text"
                id="user"
                required
                minLength="3"
                placeholder="Usuário"
                onChange={(e) => info.setUser(e.target.value)}
                value={info.user}
            />
            <input
                type="text"
                id="password"
                required
                minLength="3"
                placeholder="Senha"
                onChange={(e) => info.setPassword(e.target.value)}
                value={info.password}
            />
            <button onClick={click}>Login</button>
        </div>
    );
};

export default LoginForm;
