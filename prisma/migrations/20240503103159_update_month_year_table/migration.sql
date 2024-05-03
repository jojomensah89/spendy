/*
  Warnings:

  - You are about to drop the column `expensse` on the `YearHistory` table. All the data in the column will be lost.
  - You are about to drop the column `expensse` on the `MonthHistory` table. All the data in the column will be lost.
  - Added the required column `expense` to the `YearHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense` to the `MonthHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_YearHistory" (
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("month", "year", "userId")
);
INSERT INTO "new_YearHistory" ("income", "month", "userId", "year") SELECT "income", "month", "userId", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
CREATE TABLE "new_MonthHistory" (
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("day", "month", "year", "userId")
);
INSERT INTO "new_MonthHistory" ("day", "income", "month", "userId", "year") SELECT "day", "income", "month", "userId", "year" FROM "MonthHistory";
DROP TABLE "MonthHistory";
ALTER TABLE "new_MonthHistory" RENAME TO "MonthHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
