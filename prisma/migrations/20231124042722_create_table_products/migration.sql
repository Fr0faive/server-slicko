-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "stock" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
