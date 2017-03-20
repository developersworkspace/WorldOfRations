CREATE TABLE worldofrations.formulationFeedstuffs(
    `formulationId` CHAR(36)        NOT NULL,
    `feedstuffId`   CHAR(36)        NOT NULL,
    `minimum`       NUMERIC(10,3)   NULL,
    `maximum`       NUMERIC(10,3)   NOT NULL,
    `cost`          NUMERIC(10,3)   NOT NULL,
    `weight`        NUMERIC(10,3)   NOT NULL,
);