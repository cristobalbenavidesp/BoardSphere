/*
  Warnings:

  - You are about to drop the `PlatformUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_user_rut_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_rut_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_user_rut_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_rut_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_user_rut_fkey";

-- DropForeignKey
ALTER TABLE "ProjectInvitation" DROP CONSTRAINT "ProjectInvitation_user_rut_fkey";

-- DropTable
DROP TABLE "PlatformUser";

-- CreateTable
CREATE TABLE "User" (
    "RUT" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profession" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("RUT")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInvitation" ADD CONSTRAINT "ProjectInvitation_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "User"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;
