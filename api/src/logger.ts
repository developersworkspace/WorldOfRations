// Imports
import * as path from 'path';
import * as winston from 'winston';

// Imports configuration
import { config } from './config';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'debug' }),
    new (winston.transports.File)({
      filename: path.join(config.logging.path, 'worldofrations_api.log'),
      level: 'debug',
    }),
  ],
});

export function getLogger(name: string) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({
        filename: path.join(config.logging.path, `worldofrations_api_${name}.log`),
        level: 'debug',
      }),
    ],
  });
}

// Exports
export { logger };
