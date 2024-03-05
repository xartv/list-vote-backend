-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_author_id_fkey";

-- DropForeignKey
ALTER TABLE "list_item" DROP CONSTRAINT "list_item_author_id_fkey";

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
