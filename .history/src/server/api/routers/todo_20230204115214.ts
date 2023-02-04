import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const todoRouter = createTRPCRouter({
    getTodos: publicProcedure
    .query(({ctx}) => {
        return ctx.prisma.todo.findMany()
    }),
    addTodo: publicProcedure
    .input(z.object({text: z.str}))
})