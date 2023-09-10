const fs = require("fs");
const path = require("path");

const allSchemas = {};

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file) {
    let fileName = path.join(__dirname, file);
    let data = fs.readFileSync(fileName, 'utf8');
    let jsondata = JSON.parse(data);
    for (let key in jsondata) {
        allSchemas[key] = jsondata[key]
    }
});
module.exports = allSchemas