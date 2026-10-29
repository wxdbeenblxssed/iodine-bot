const _module = {};

function createLogLevel(level, logger) {
     return function(message) {
          logger.log(`[${level}]: ${message}`);
     }
}

_module.info = createLogLevel("INFO", { log: console.log });
_module.warn = createLogLevel("WARN", { log: console.warn });
_module.error = createLogLevel("ERROR", { log: console.error });

module.exports = _module;
