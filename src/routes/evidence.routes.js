import { Router } from "express";
import { createEvidenceSchema } from "../schemas/evidence.schema.js";
import {createEvidence,deleteEvidence,getEvidence,getEvidences,updateEvidence} from "../controllers/evidence.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();
// Rutas para evidencias
router.get("/evidence",authRequired,getEvidences);
router.get("/evidence/:id",authRequired,getEvidence);
router.post("/evidence",authRequired,validateSchema(createEvidenceSchema),createEvidence);
router.put("/evidence/:id",authRequired,updateEvidence);
router.delete("/evidence/:id",authRequired,deleteEvidence);

// Ruta para subir una imagen de evidencia


export default router;