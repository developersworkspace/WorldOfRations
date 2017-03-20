CREATE TABLE worldofrations.formulationResultFeedstuffs(
    `formulationId` CHAR(36)        NOT NULL,
    `feedstuffId`   CHAR(36)        NOT NULL,
    `weight`        NUMERIC(10,3)   NOT NULL,
    `status`        CHAR(64)        NOT NULL,
    `cost`          NUMERIC(10,3)   NOT NULL
);