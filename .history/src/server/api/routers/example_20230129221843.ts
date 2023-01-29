import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  
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
  .mutation(({ctx, input}) => {
    return ctx.prisma.todo.delete({
      where: {
   
        name: input.name 
     
      }
    })
  }),

});
 