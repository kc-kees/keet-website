-- CreateTable
CREATE TABLE "Uitje" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "datum" TEXT NOT NULL,
    "locatie" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,
    "coverFoto" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aankomend',
    "aangemaaktOp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uitje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uitje_slug_key" ON "Uitje"("slug");
