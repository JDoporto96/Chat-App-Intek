const {createLogger, format, transports }= require('winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports:[
        new transports.File({
            maxsize: 5120000,
            maxfiles: 5,
            filename: `${__dirname}/../logs/auth-api.log`
        }),
        new transports.File({ 
            maxsize: 5120000,
            maxfiles: 5,
            filename: `${__dirname}/../logs/auth-api-erros.log`, 
            level: 'error' }),
    ]
})