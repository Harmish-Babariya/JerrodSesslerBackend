const { formatValidationErrors } = require('../utils/errors');

// Create a middleware function for request body validation
let validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const validationErrors = formatValidationErrors(error);
            return res.status(400).json(validationErrors);
        }

        // Validation succeeded, continue to the next middleware or route handler
        next();
    };
}

module.exports = { validateRequest }