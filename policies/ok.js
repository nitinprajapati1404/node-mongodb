/**
 * code start for sanitize response
 */
var Ajv = require('ajv');
var ajv = new Ajv({
    removeAdditional: true,
    strictTypes: false
});

module.exports = function (params) {
    return function (req, res, next) {
        res.ok = function (schema,obj) {
            if (params !== "on"){
                return res.status(200).send(obj);
            }
            if (schema && Object.keys(schema).length) {
                const validate = ajv.compile(schema);
                const isValid = validate(obj);                
                // console.log("obj:::", obj)
                if (!isValid) {
                    return res.status(500).json({ errors: validate.errors });
                }
                return res.status(200).send(obj);
            } else {
                return res.status(400).json({ errors: [{ "message": "Response Schema not found" }] });
            }
        };
        next();
    }
}

// "data": {
//     "additionalProperties": true,
//         "properties": {
//         "universityId": {
//             "type": ["string"]
//         },
//         "role": {
//             "type": ["string"]
//         }
//     },
//     "required": []
// }
// "data": {
//     "additionalProperties": false,
//         "type": "object",
//             "properties": {
//         "universityId": {
//             "type": ["string"]
//         },
//         "role": {
//             "type": ["string"]
//         }
//     }
// }