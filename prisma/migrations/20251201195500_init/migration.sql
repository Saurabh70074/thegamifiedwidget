-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "userToken" TEXT,
    "websiteUrl" TEXT,
    "secret" TEXT,
    "mobile" TEXT,
    "email" TEXT,
    "gender" TEXT,
    "age" TEXT,
    "transaction" TEXT,
    "city" TEXT,
    "state" TEXT,
    "os" TEXT,
    "device" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserSettings" ("createdAt", "id", "shop", "updatedAt", "userToken", "websiteUrl") SELECT "createdAt", "id", "shop", "updatedAt", "userToken", "websiteUrl" FROM "UserSettings";
DROP TABLE "UserSettings";
ALTER TABLE "new_UserSettings" RENAME TO "UserSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
