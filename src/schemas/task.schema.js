import { z } from "zod";

export const createTaskSchema=z.object({
    title:z.string({
        required_error:'Title is required'
    }),
    description:z.string({
        required_error:'description must be string'
    }),
    region:z.string({
        required_error:'Region is required'
    }),
    status:z.string({
        required_error:'Status is required'
    }),
    date:z.string().datetime().optional(),
});