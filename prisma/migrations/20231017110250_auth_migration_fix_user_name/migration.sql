/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "cover" TEXT,
    "bio" TEXT,
    "link" TEXT,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("bio", "cover", "createdAt", "email", "emailVerified", "id", "image", "lastname", "link", "location", "username") SELECT "bio", "cover", "createdAt", "email", "emailVerified", "id", "image", "lastname", "link", "location", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
