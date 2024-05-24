import { z } from "zod";

export const createEvidenceSchema=z.object({
    title:z.string({
        required_error:'Titulo es requerido'
    }),
    description:z.string({
        required_error:'Descripcion debe ser string'
    }),
    origin:z.string({
        required_error:'Origen es requerido'
    }),
    quantity:z.number({
        required_error:'Cantidad es requerido'
    }),
    date:z.string().datetime().optional(),
});