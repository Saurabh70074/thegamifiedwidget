/*
  Warnings:

  - You are about to drop the column `age` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `transaction` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `userToken` on the `UserSettings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "shopName" TEXT,
    "secret" TEXT,
    "websiteUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserSettings" ("createdAt", "id", "secret", "shop", "updatedAt", "websiteUrl") SELECT "createdAt", "id", "secret", "shop", "updatedAt", "websiteUrl" FROM "UserSettings";
DROP TABLE "UserSettings";
ALTER TABLE "new_UserSettings" RENAME TO "UserSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
