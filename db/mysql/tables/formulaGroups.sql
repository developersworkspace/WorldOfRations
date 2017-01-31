CREATE TABLE sadfmcoz_dwtest.formulaGroups(
    `id`                CHAR(36)        NOT NULL,
    `parentGroupId`     CHAR(36)        NULL,
    `name`              VARCHAR(255)    NOT NULL,
    `description`       VARCHAR(255)    NULL,
    `sortOrder`         INT             NOT NULL
);