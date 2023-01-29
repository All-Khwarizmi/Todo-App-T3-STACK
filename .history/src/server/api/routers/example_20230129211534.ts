import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        date: `Hello ${new Date()}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getTodos: publicProcedure
  .query(({ctx}) => {
    return ctx.prisma.todo.findMany()
  }),
  todo: publicProcedure
  .query(({ctx}) => {
    return ctx.prisma.todo.findMany()
    
  }),
  deleteTodo: publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation({ctx, input}),
  addTest: publicProcedure
  .input(z.object({ text: z.string() }))
  .mutation(async ({ctx, input}) => {
    return await ctx.prisma.todo.create({
      data: {
        name: input.text
      }
    })
  })

});
 