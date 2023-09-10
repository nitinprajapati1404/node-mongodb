var AJV = require("ajv")
var ajv = new AJV({
    allErrors: true,
    $data: true,
    strictSchema: false,
    allowMatchingProperties: true,
    strictTypes: false
})

//Validate AJV
// const allSchemas = require(`./../schema`)

// module.exports = function (req, res, next) {
//     // let routeName = (req.url.split('/')[1] || "").toLowerCase();

//     let methodName = (req.url.split('/')[2] || "").toLowerCase();
//     if (typeof allSchemas[methodName] != "undefined") {
//         var requestValidate = ajv.compile(allSchemas[methodName].req);
//         req.body = { ...req.body, ...req.params, ...req.query };
//         if (requestValidate(req.body)) {
//             return next();
//         }
//         return res.status(404).send({ message: "schema validation error", data: requestValidate.errors[0] });
//     } else {
//         return res.status(404).send({ message: "schema not found", data: {} });
//     }
// }

// Request validation middleware
// function validateRequest(req, res, next) {
//     const validate = ajv.compile(requestSchema);
//     const isValid = validate(req.body);

//     if (!isValid) {
//         return res.status(400).json({ errors: validate.errors });
//     }

//     next();
// }

// // Response validation middleware
// function validateResponse(req, res, next) {
//     const validate = ajv.compile(responseSchema);
//     const isValid = validate(res.locals.responseData); // Assuming the response data is stored in res.locals

//     if (!isValid) {
//         return res.status(500).json({ errors: validate.errors });
//     }

//     next();
// }

// Define a request validation middleware function that accepts a schema as an argument
function validateRequest(schema) {
    return (req, res, next) => {
        if (schema && Object.keys(schema).length){
            const validate = ajv.compile(schema);
            const isValid = validate(req.body);
            if (!isValid) {
                return res.status(400).json({ errors: validate.errors });
            }
        }else{
            return res.status(400).json({ errors: [{"message":"Request Schema not found"}] });
        }
        
        next();
    };
}

module.exports = {
    validateRequest
};