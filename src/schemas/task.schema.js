import { z } from "zod";

export const createTaskSchema=z.object({
    title:z.string({
        required_error:'Titulo es requerido'
    }),
    description:z.string({
        required_error:'Descripcion debe ser string'
    }),
    region:z.string({
        required_error:'Region es requerido'
    }),
    status:z.string({
        required_error:'Status es requerido'
    }),
    date:z.string().datetime().optional(),
});