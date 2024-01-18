const formatValidationErrors = (error) => {
    const formattedErrors = {};

    if (error) {
        error.details.forEach(detail => {
            formattedErrors[detail.context.key] = detail.message.replace(/"/g, '');
        });
    }

    return formattedErrors;
}

module.exports = { formatValidationErrors }