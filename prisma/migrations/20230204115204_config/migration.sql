-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DONE', 'STARTED', 'TODO');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status" DEFAULT 'TODO';
