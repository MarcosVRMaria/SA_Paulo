import"./index.css"
import {Link} from "react-router-dom"
const Card = ({name,route}) => {

    return(
        <Link to={route}>
        <button className="card">
            {name}
        </button>
        </Link>
    )
}
export default Card