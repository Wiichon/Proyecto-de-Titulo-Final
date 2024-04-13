import { z } from "zod";

export const createEvidenceSchema=z.object({
    title:z.string({
        required_error:'Title is required'
    }),
    description:z.string({
        required_error:'description must be string'
    }),
    origin:z.string({
        required_error:'Origin is required'
    }),
    quantity:z.number({
        required_error:'Quantity is required'
    }),
    date:z.string().datetime().optional(),
});