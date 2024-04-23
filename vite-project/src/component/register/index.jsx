import "./index.css"

const RegisterForm = ({ info, click }) => {


  return (
    <div id="register-main">
      <div className="div-email">
        <input
          type="text"
          id="email"
          required
          minLength="3"
          placeholder="E-mail"
          onChange={(e) => info.setEmail(e.target.value)}
          value={info.email}
        />
      </div>
      <div className="div-user-register">
        <input
          type="text"
          id="user-register"
          required
          minLength="3"
          placeholder="Usuário"
          onChange={(e) => info.setUser(e.target.value)}
          value={info.user}
        />
      </div>
      <div className="div-password-register">
        <input
          type="password"
          id="password-register"
          required
          minLength="6"
          placeholder="Senha"
          onChange={(e) => info.setPassword(e.target.value)}
          value={info.password}
        />
      </div>
      <div className="div-password2-register">
        <input
          type="password"
          id="password2"
          required
          minLength="6"
          placeholder="Confirme Senha"
          onChange={(e) => info.setPassword2(e.target.value)}
          value={info.password2}
        />
      </div>
      <div className="div-bnt-register">
        <button className="bnt-register" onClick={click}>Cadastrar</button>
      </div>
    </div>
  );
};

export default RegisterForm;
