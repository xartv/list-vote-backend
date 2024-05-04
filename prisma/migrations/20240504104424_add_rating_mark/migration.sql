-- CreateTable
CREATE TABLE "rating_mark" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "list_item_id" TEXT NOT NULL,

    CONSTRAINT "rating_mark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rating_mark" ADD CONSTRAINT "rating_mark_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_mark" ADD CONSTRAINT "rating_mark_list_item_id_fkey" FOREIGN KEY ("list_item_id") REFERENCES "list_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
