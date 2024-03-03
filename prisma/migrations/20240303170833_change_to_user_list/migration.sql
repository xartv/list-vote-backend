/*
  Warnings:

  - You are about to drop the `UserList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_list_id_fkey";

-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_user_id_fkey";

-- DropTable
DROP TABLE "UserList";

-- CreateTable
CREATE TABLE "user_list" (
    "user_id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,

    CONSTRAINT "user_list_pkey" PRIMARY KEY ("user_id","list_id")
);

-- AddForeignKey
ALTER TABLE "user_list" ADD CONSTRAINT "user_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_list" ADD CONSTRAINT "user_list_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
