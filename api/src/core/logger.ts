// Imports
import * as winston from 'winston';

// Add file logger
winston.add(winston.transports.File, { filename: 'core.log' });

// Removes console logger
winston.remove(winston.transports.Console);

// Exports
export { winston };