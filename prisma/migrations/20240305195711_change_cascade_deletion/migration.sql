-- DropForeignKey
ALTER TABLE "user_list" DROP CONSTRAINT "user_list_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_list" ADD CONSTRAINT "user_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
