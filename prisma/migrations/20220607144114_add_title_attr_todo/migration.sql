/*
  Warnings:

  - Added the required column `title` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "title" TEXT NOT NULL;
