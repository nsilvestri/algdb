-- CreateTable
CREATE TABLE "UserLearnedAlgorithmForCase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "algorithmsForCaseId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "UserLearnedAlgorithmForCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLearnedAlgorithmForCase_userId_algorithmsForCaseId_key" ON "UserLearnedAlgorithmForCase"("userId", "algorithmsForCaseId");

-- AddForeignKey
ALTER TABLE "UserLearnedAlgorithmForCase" ADD CONSTRAINT "UserLearnedAlgorithmForCase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLearnedAlgorithmForCase" ADD CONSTRAINT "UserLearnedAlgorithmForCase_algorithmsForCaseId_fkey" FOREIGN KEY ("algorithmsForCaseId") REFERENCES "AlgorithmsForCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
