CREATE TABLE worldofrations.formulations(
    `id`            CHAR(36)        NOT NULL,
    `formulaId`     CHAR(36)        NOT NULL,
    `feasible`      BOOLEAN         NOT NULL,
    `cost`          NUMERIC(10,3)   NULL,
    `currencyCode`  CHAR(6)         NOT NULL,
    `timestamp`     INT             NOT NULL
);