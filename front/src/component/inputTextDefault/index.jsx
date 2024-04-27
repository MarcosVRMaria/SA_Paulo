const InputTextDefault = ({ info }) => {

    return (
        <input
            type="text"
            id={info.id}
            required
            minLength="3"
            placeholder={info.placeholder}
            onChange={(e) => info.func(e.target.value)}
            value={info.value}
        />
    )
}

export default InputTextDefault