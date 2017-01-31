CREATE TABLE worldofrations.feedstuffs(
    `id`                CHAR(36)        NOT NULL,
    `groupId`           CHAR(36)        NOT NULL,
    `name`              VARCHAR(255)    NOT NULL,
    `description`       VARCHAR(255)    NULL,
    `sortOrder`         INT             NOT NULL
);