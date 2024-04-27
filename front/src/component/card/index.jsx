import {Link} from "react-router-dom"
const Card = ({name,route}) => {

    return(
        <Link to={route}>
        <button >
            {name}
        </button>
        </Link>
    )
}
export default Card