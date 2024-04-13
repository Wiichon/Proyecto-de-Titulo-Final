import axios from "./axios";

export const getEvidencesRequest = async () => axios.get("/evidence");
export const getEvidenceRequest = async (id) => axios.get(`/evidence/${id}`);
export const createEvidenceRequest = async (evidence) => axios.post("/evidence", evidence);
export const updateEvidenceRequest = async (id, evidence) => axios.put(`/evidence/${id}`, evidence);
export const deleteEvidenceRequest = async (id) => axios.delete(`/evidence/${id}`)