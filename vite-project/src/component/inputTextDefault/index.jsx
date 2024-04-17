const IndexTextDefault = (info) => {

    return (
        <input
            type={info.text}
            id={info.id}
            required
            minLength="3"
            placeholder={info.placeholder}
            onChange={(e) => { info.func }}
            value={info.value}
        />
    )
}

export default IndexTextDefault