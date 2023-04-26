-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
