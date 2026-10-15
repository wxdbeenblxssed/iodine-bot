const path = require("node:path");

const LoggingLib = {};

function getCurrentTime() {
     const date = new Date();

     const unpaddedTime = [date.getHours(), date.getMinutes(), date.getSeconds()];
     const timeArray = [];

     for (let i = 0; i <= 2; i++) {
          const timeValue = unpaddedTime[i];

          if (timeValue < 10) {
               timeArray[i] = `0${timeValue.toString()}`;
          } else {
               timeArray[i] = timeValue;
          }
     }

     return timeArray;
}

function getCallerName() {
     const stack = new Error().stack;
     
     const line = stack.split("at ")[3].trim();
     const basename = path.basename(line);
     const splitBasename = basename.split(":");

     return splitBasename[0];
}

function createLogger(logLevel, Logger) {
     return function(message) {
          const timeArray = getCurrentTime();
          const callerName = getCallerName();

          const finalMessage = `[${timeArray[0]}:${timeArray[1]}:${timeArray[2]}] [${callerName}/${logLevel.toUpperCase()}]: ${message}`;

          Logger.log(finalMessage);
     }
}

LoggingLib.message = createLogger("message", { log: console.log });
LoggingLib.info = createLogger("info", { log: console.log });
LoggingLib.warn = createLogger("warn", { log: console.warn });
LoggingLib.error = createLogger("error", { log: console.error });

module.exports = LoggingLib;
