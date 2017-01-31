import * as winston from 'winston';
winston.add(winston.transports.File, { filename: 'core.log' });
winston.remove(winston.transports.Console);
export { winston };