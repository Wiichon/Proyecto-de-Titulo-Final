import { Link } from "react-router-dom"

function Changer() {
    return (
        <div className="pb-4 ">
            <Link to="/evidence" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2">Evidencias</Link>
            <Link to="/tasks" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2">Casos</Link>
            <Link to="/charts" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Gráficos</Link>
        </div>
    )
}

export default Changer