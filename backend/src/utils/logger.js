import {createLogger, format, transports } from 'winston';

const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    defaultMeta: { service: 'apollo-server' },  
    transports:[
        new transports.File({
            maxsize: 5120000,
            maxfiles: 5,
            filename: `info.log`
        }),
        new transports.File({ 
            maxsize: 5120000,
            maxfiles: 5,
            filename: `error.log`, 
            level: 'error' }),
    ]
})
export default logger