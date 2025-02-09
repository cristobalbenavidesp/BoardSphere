-- CreateTable
CREATE TABLE "Article" (
    "project_id" UUID NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_rut" VARCHAR(255) NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id","project_id","chapter_id")
);

-- CreateTable
CREATE TABLE "Clause" (
    "id" INTEGER NOT NULL,
    "project_id" UUID NOT NULL,
    "article_id" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Clause_pkey" PRIMARY KEY ("id","project_id","article_id","chapter_id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "project_id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id","project_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "user_rut" VARCHAR(255) NOT NULL,
    "post_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "parent_comment_id" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "user_rut" VARCHAR(255) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "observation" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "chapter_id" INTEGER NOT NULL,
    "clause_id" INTEGER NOT NULL,
    "project_id" UUID NOT NULL,
    "id" INTEGER NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id","user_rut","article_id","clause_id","project_id","chapter_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "user_rut" VARCHAR(255) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "organization" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "official" BOOLEAN NOT NULL DEFAULT false,
    "invitation_type" VARCHAR(20) NOT NULL DEFAULT 'open',
    "phase" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "user_rut" VARCHAR(255) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInvitation" (
    "project_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "user_rut" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProjectInvitation_pkey" PRIMARY KEY ("project_id","user_rut")
);

-- CreateTable
CREATE TABLE "PlatformUser" (
    "RUT" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profession" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PlatformUser_pkey" PRIMARY KEY ("RUT")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_chapter_id_project_id_fkey" FOREIGN KEY ("chapter_id", "project_id") REFERENCES "Chapter"("id", "project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_article_id_project_id_chapter_id_fkey" FOREIGN KEY ("article_id", "project_id", "chapter_id") REFERENCES "Article"("id", "project_id", "chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_chapter_id_project_id_fkey" FOREIGN KEY ("chapter_id", "project_id") REFERENCES "Chapter"("id", "project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_article_id_project_id_chapter_id_fkey" FOREIGN KEY ("article_id", "project_id", "chapter_id") REFERENCES "Article"("id", "project_id", "chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_chapter_id_project_id_fkey" FOREIGN KEY ("chapter_id", "project_id") REFERENCES "Chapter"("id", "project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_clause_id_project_id_article_id_chapter_id_fkey" FOREIGN KEY ("clause_id", "project_id", "article_id", "chapter_id") REFERENCES "Clause"("id", "project_id", "article_id", "chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInvitation" ADD CONSTRAINT "ProjectInvitation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInvitation" ADD CONSTRAINT "ProjectInvitation_user_rut_fkey" FOREIGN KEY ("user_rut") REFERENCES "PlatformUser"("RUT") ON DELETE RESTRICT ON UPDATE CASCADE;
