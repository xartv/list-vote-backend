-- DropForeignKey
ALTER TABLE "list_item" DROP CONSTRAINT "list_item_list_id_fkey";

-- AddForeignKey
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
