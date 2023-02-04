import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const todoRouter = createTRPCRouter({
    getTodos: publicProcedure
    .query(({ctx}) => {
        return ctx.prisma.todo.findMany()
    }),
    addTodo: publicProcedure
    .input(z.object({text: z.string()}))
    .mutation(({ctx, input}) => {
        return ctx.prisma.todo.create({
            data: {
                name: input.text
            }
        })
    }),
    deleteTodo: publicProcedure
    .input(z.object({name: z.string()}))
    .mutation(({ctx, input}) => {
        return ctx.prisma.todo.delete({
            where: {
                name: input.name
            }
        })
    }),
    deleteAll: publicProcedure
    .mutation(({ctx}) => {
        return ctx.prisma.todo.deleteMany()
    }),
    startTodo: publicProcedure
    .input(({z.object()}))

})