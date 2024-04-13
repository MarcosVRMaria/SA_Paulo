
const RegisterForm = ({info, click}) => {
  

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
        type="password"
        id="password"
        required
        minLength="6"
        placeholder="Senha"
        onChange={(e) => info.setPassword(e.target.value)}
        value={info.password}
      />
      <input
        type="password"
        id="password2"
        required
        minLength="6"
        placeholder="Confirme Senha"
        onChange={(e) => info.setPassword2(e.target.value)}
        value={info.password2}
      />
      <button onClick={click}>Cadastrar</button>
    </div>
  );
};

export default RegisterForm;
