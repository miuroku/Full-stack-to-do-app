import winston, {format} from 'winston';

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

const myFormat = () => format.printf( ({ level, message, timestamp }) => {
    const niceDate = new Date(); // toLocaleString()
    const niceStringDate = `[${niceDate.getFullYear()}-${niceDate.getMonth()+1}-${niceDate.getDate()}-${formatAMPM(niceDate)}]`
    return `${niceStringDate} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: format.combine(                 
                format.colorize(),
                format.timestamp(),
                format.simple(),
                myFormat())
        })
    ]
});

export default logger;