CREATE TABLE worldofrations.elements 
  ( 
     `id`           CHAR(36) NOT NULL, 
     `unit`         CHAR(36) NOT NULL, 
     `abbreviation` CHAR(36) NOT NULL, 
     `code`         CHAR(36) NOT NULL, 
     `name`         VARCHAR(255) NOT NULL, 
     `sortorder`    INT NOT NULL 
  ); 

CREATE TABLE worldofrations.feedstuffGroups 
  ( 
     `id`            CHAR(36) NOT NULL, 
     `parentGroupId` CHAR(36) NULL, 
     `name`          VARCHAR(255) NOT NULL, 
     `description`   VARCHAR(255) NULL, 
     `sortorder`     INT NOT NULL 
  ); 

CREATE TABLE worldofrations.feedstuffs 
  ( 
     `id`          CHAR(36) NOT NULL, 
     `groupId`     CHAR(36) NOT NULL, 
     `name`        VARCHAR(255) NOT NULL, 
     `description` VARCHAR(255) NULL, 
     `sortorder`   INT NOT NULL 
  );  

CREATE TABLE worldofrations.feedstuffMeasurements 
  ( 
     `feedstuffId` CHAR(36) NOT NULL, 
     `elementId`   CHAR(36) NOT NULL, 
     `value`       DECIMAL(20, 5) NOT NULL 
  ); 

CREATE TABLE worldofrations.formulaGroups 
  ( 
     `id`            CHAR(36) NOT NULL, 
     `parentGroupId` CHAR(36) NULL, 
     `name`          VARCHAR(255) NOT NULL, 
     `description`   VARCHAR(255) NULL, 
     `sortorder`     INT NOT NULL 
  ); 

CREATE TABLE worldofrations.formulas 
  ( 
     `id`          CHAR(36) NOT NULL, 
     `groupId`     CHAR(36) NOT NULL, 
     `name`        VARCHAR(255) NOT NULL, 
     `description` VARCHAR(255) NULL, 
     `sortorder`   INT NOT NULL 
  ); 

CREATE TABLE worldofrations.formulaMeasurements 
  ( 
     `formulaId` CHAR(36) NOT NULL, 
     `elementId` CHAR(36) NOT NULL, 
     `minimum`   DECIMAL(20, 5) NULL, 
     `maximum`   DECIMAL(20, 5) NULL 
  ); 

CREATE TABLE worldofrations.comparisonFormulas 
  ( 
     `id`        CHAR(36) NOT NULL, 
     `formulaId` CHAR(36) NOT NULL 
  ); 

CREATE TABLE worldofrations.formulations 
  ( 
     `id`           CHAR(36) NOT NULL, 
     `formulaId`    CHAR(36) NOT NULL, 
     `feasible`     BOOLEAN NOT NULL, 
     `cost`         NUMERIC(10, 3) NULL, 
     `currencycode` CHAR(6) NOT NULL, 
     `timestamp`    BIGINT NOT NULL 
  ); 

CREATE TABLE worldofrations.formulationFeedstuffs 
  ( 
     `formulationId` CHAR(36) NOT NULL, 
     `feedstuffId`   CHAR(36) NOT NULL, 
     `minimum`       NUMERIC(10, 3) NULL, 
     `maximum`       NUMERIC(10, 3) NOT NULL, 
     `cost`          NUMERIC(10, 3) NOT NULL, 
     `weight`        NUMERIC(10, 3) NOT NULL 
  ); 

CREATE TABLE worldofrations.suggestedValues(
    `feedstuffId`       CHAR(36)        NOT NULL,
    `formulaGroupId`    CHAR(36)        NOT NULL,
    `minimum`           DECIMAL         NULL,
    `maximum`           DECIMAL         NULL
);


CREATE TABLE worldofrations.users(
    `id`                  CHAR(36)    NOT NULL,
    `username`            CHAR(128)   NOT NULL,
    `lastLoginTimestamp`  BIGINT      NOT NULL
);


CREATE TABLE worldofrations.userFeedstuffs(
    `id`            CHAR(36)      NOT NULL,  
    `userId`        CHAR(36)      NOT NULL,
    `name`          VARCHAR(255)  NOT NULL, 
    `description`   VARCHAR(255)  NULL
);

