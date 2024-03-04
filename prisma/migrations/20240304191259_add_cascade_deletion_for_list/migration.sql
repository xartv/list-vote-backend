-- DropForeignKey
ALTER TABLE "user_list" DROP CONSTRAINT "user_list_list_id_fkey";

-- AddForeignKey
ALTER TABLE "user_list" ADD CONSTRAINT "user_list_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
