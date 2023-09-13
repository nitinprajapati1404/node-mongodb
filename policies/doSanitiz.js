var AJV = require("ajv")
var ajv = new AJV({
    allErrors: true,
    $data: true,
    strictSchema: false,
    allowMatchingProperties: true,
    strictTypes: false
})
// Define a request validation middleware function that accepts a schema as an argument
function validateRequest(schema) {
    return (req, res, next) => {
        if (schema && Object.keys(schema).length){
            const validate = ajv.compile(schema);
            req.body = { ...req.body ,...req.query};
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