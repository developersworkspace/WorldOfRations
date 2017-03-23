// Imports
import * as winston from 'winston';
import * as path from 'path';

// Imports configuration
import { config } from './config';

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'debug' }),
    new (winston.transports.File)({
      filename: path.join(config.logging.path, 'worldofrations_api.log'),
      level: 'debug'
    })
  ]
});

export function getLogger(name: string) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({
        filename: path.join(config.logging.path, `worldofrations_api_${name}.log`),
        level: 'debug'
      })
    ]
  });
}

// Exports
export { logger };