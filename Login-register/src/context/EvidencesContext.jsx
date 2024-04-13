import { createContext, useState,useContext } from "react";
import{createEvidenceRequest,getEvidencesRequest,deleteEvidenceRequest,getEvidenceRequest,updateEvidenceRequest} from '../../api/evidences';

const EvidencesContext = createContext();

export const useEvidences = () => {
    const context = useContext(EvidencesContext);
    if (!context) {
        throw new Error("useEvidences must be used within a EvidencesProvider");
    }
    return context;
}

export function EvidencesProvider({ children }) {
    const [evidences, setEvidences] = useState([]);

    const createEvidence = async (evidence) => {
        try {
            const res = await createEvidenceRequest(evidence);
            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getEvidences = async () => {
        try {
            const res = await getEvidencesRequest();
            setEvidences(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEvidence = async (id) => {
        try {
            const res =await deleteEvidenceRequest(id);
            if (res.status === 204)setEvidences(evidences.filter(evidence => evidence._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getEvidence = async (id) => {
        try {
            const res= await getEvidenceRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const updateEvidence = async (id, evidence) => {
        try {
            const res = await updateEvidenceRequest(id, evidence);
            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }


    return(
        <EvidencesContext.Provider value={{
            evidences,
            getEvidences,
            createEvidence,
            deleteEvidence,
            getEvidence,
            updateEvidence

        }}>
            {children}
        </EvidencesContext.Provider>
    )
}