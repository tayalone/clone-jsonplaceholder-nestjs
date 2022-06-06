-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "comment_deleted_at" ON "comments"("deletedAt");

-- CreateIndex
CREATE INDEX "comment_post_id_deleted_at" ON "comments"("postId", "deletedAt");

-- CreateIndex
CREATE INDEX "post_deleted_at" ON "posts"("deletedAt");

-- CreateIndex
CREATE INDEX "post_user_id_deleted_at" ON "posts"("userId", "deletedAt");
