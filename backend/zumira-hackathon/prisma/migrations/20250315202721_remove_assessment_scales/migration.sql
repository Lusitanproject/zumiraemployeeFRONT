/*
  Warnings:

  - You are about to drop the column `assessment_scale_id` on the `assessments` table. All the data in the column will be lost.
  - You are about to drop the `assessment_scales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `self_monitoring_scales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `self_monitoring_block_id` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `assessments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "assessments" DROP CONSTRAINT "assessments_assessment_scale_id_fkey";

-- DropForeignKey
ALTER TABLE "self_monitoring_scales" DROP CONSTRAINT "self_monitoring_scales_assessment_scale_id_fkey";

-- DropForeignKey
ALTER TABLE "self_monitoring_scales" DROP CONSTRAINT "self_monitoring_scales_self_monitoring_id_fkey";

-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "assessment_scale_id",
ADD COLUMN     "self_monitoring_block_id" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "assessment_scales";

-- DropTable
DROP TABLE "self_monitoring_scales";

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_self_monitoring_block_id_fkey" FOREIGN KEY ("self_monitoring_block_id") REFERENCES "self_monitoring_blocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
