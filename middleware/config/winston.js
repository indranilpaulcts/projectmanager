/**
 * Winston Logger Configuration
 * Log Path: middleware/logs/
 */
var appRoot = require('app-root-path');
var winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { ts: new Date().toISOString() },
    transports: [
        new winston.transports.File({ filename: `${appRoot.path}/logs/error.log`, level: 'error', handleExceptions: true, }),
        new winston.transports.File({ filename: `${appRoot.path}/logs/app.log`, handleExceptions: true, })
    ],
    exitOnError: false
});
  
module.exports = logger;