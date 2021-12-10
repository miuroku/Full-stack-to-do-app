import logger from '../LoggerService/logger';


export function printAllObject(obj: Object): string {
    let result_string = "";
    for (const [key, val] of Object.entries(obj)) {
        result_string += `# [key, val]: "${key}": "${val}"\n`;
        if (typeof val == "object") {
            result_string += printAllObject(val);
        }
    }

    logger.info(`Object => ${result_string}`);
    return result_string;
}