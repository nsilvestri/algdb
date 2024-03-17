-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "wcaId" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "visualizationId" TEXT NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "visualizationId" TEXT NOT NULL,
    "methodId" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Algorithm" (
    "id" TEXT NOT NULL,
    "moves" TEXT NOT NULL,
    "caseId" TEXT,

    CONSTRAINT "Algorithm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgorithmsForCase" (
    "id" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,

    CONSTRAINT "AlgorithmsForCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visualization" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" JSONB NOT NULL,

    CONSTRAINT "Visualization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Method" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "visualizationId" TEXT NOT NULL,

    CONSTRAINT "Method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CaseToSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MethodToSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Puzzle_visualizationId_idx" ON "Puzzle"("visualizationId");

-- CreateIndex
CREATE INDEX "Set_puzzleId_idx" ON "Set"("puzzleId");

-- CreateIndex
CREATE INDEX "Set_visualizationId_idx" ON "Set"("visualizationId");

-- CreateIndex
CREATE INDEX "Case_puzzleId_idx" ON "Case"("puzzleId");

-- CreateIndex
CREATE INDEX "Algorithm_caseId_idx" ON "Algorithm"("caseId");

-- CreateIndex
CREATE INDEX "AlgorithmsForCase_algorithmId_idx" ON "AlgorithmsForCase"("algorithmId");

-- CreateIndex
CREATE INDEX "AlgorithmsForCase_caseId_idx" ON "AlgorithmsForCase"("caseId");

-- CreateIndex
CREATE INDEX "Method_puzzleId_idx" ON "Method"("puzzleId");

-- CreateIndex
CREATE INDEX "Method_visualizationId_idx" ON "Method"("visualizationId");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToSet_AB_unique" ON "_CaseToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToSet_B_index" ON "_CaseToSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MethodToSet_AB_unique" ON "_MethodToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_MethodToSet_B_index" ON "_MethodToSet"("B");

