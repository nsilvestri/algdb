/*
  Warnings:

  - You are about to drop the column `caseId` on the `Algorithm` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_userId_idx";

-- DropIndex
DROP INDEX "Algorithm_caseId_idx";

-- DropIndex
DROP INDEX "AlgorithmsForCase_algorithmId_idx";

-- DropIndex
DROP INDEX "AlgorithmsForCase_caseId_idx";

-- DropIndex
DROP INDEX "Case_puzzleId_idx";

-- DropIndex
DROP INDEX "Method_puzzleId_idx";

-- DropIndex
DROP INDEX "Method_visualizationId_idx";

-- DropIndex
DROP INDEX "Puzzle_visualizationId_idx";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- DropIndex
DROP INDEX "Set_puzzleId_idx";

-- DropIndex
DROP INDEX "Set_visualizationId_idx";

-- AlterTable
ALTER TABLE "Algorithm" DROP COLUMN "caseId";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_visualizationId_fkey" FOREIGN KEY ("visualizationId") REFERENCES "Visualization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_visualizationId_fkey" FOREIGN KEY ("visualizationId") REFERENCES "Visualization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlgorithmsForCase" ADD CONSTRAINT "AlgorithmsForCase_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "Algorithm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlgorithmsForCase" ADD CONSTRAINT "AlgorithmsForCase_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Method" ADD CONSTRAINT "Method_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Method" ADD CONSTRAINT "Method_visualizationId_fkey" FOREIGN KEY ("visualizationId") REFERENCES "Visualization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSet" ADD CONSTRAINT "_CaseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSet" ADD CONSTRAINT "_CaseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodToSet" ADD CONSTRAINT "_MethodToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodToSet" ADD CONSTRAINT "_MethodToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;
