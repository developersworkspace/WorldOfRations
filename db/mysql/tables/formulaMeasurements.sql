CREATE TABLE worldofrations.formulaMeasurements(
    `formulaId`     CHAR(36)        NOT NULL,
    `elementId`     CHAR(36)        NOT NULL,
    `minimum`       DECIMAL(20,5)   NULL,
    `maximum`       DECIMAL(20,5)   NULL
);