const path = require("node:path");
const fs = require("node:fs");
const LoggingUtils = require("../utils/logging-utils");

const _module = {};

const fontsFolder = path.join(__dirname, "..", "data", "fonts");

_module.setFont = function(name, string) {
     const filePath = path.join(fontsFolder, `${name}-font.json`);

     if (fs.existsSync(filePath)) {
          const file = require(filePath);
          let newString = "";

          for (let i = 0; i < string.length; i++) {
               const oldChar = string.charAt(i);
               const newChar = file[oldChar] ?? oldChar;

               newString = `${newString}${newChar}`;
          }

          return newString;
     } else {
          LoggingUtils.error(`Couldn't find a font file with the name "${name}".`);
     }
}

module.exports = _module;
