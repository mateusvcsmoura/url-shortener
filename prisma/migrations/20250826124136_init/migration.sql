-- CreateTable
CREATE TABLE "public"."Url" (
    "id" SERIAL NOT NULL,
    "longUrl" VARCHAR(300) NOT NULL,
    "shortCode" VARCHAR(255) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_longUrl_key" ON "public"."Url"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortCode_key" ON "public"."Url"("shortCode");
