import { useEvidences } from "../context/EvidencesContext"
import { Link } from "react-router-dom"
import days from 'dayjs';
import utc from 'dayjs/plugin/utc';
days.extend(utc);
function EvidenceCard({ evidence }) {
    
    const {deleteEvidence}=useEvidences() 

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{evidence.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-md" onClick={() => {
                        deleteEvidence(evidence._id)
                    }}>Delete</button>
                    <Link to={`/evidence/${evidence._id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md">Edit</Link>
                </div>
                
            </header>
            <p className="text-slate-300">{evidence.description}</p>
            <p>
                {days(evidence.date).utc().format('DD/MM/YYYY')}
            </p>

        </div>

    )
}

export default EvidenceCard