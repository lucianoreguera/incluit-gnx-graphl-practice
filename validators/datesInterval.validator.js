const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const ValidateDateInterval = {
    validate: async function (typeName, originalObj, materializeObj) {
        if (materializeObj.from_date >= materializeObj.to_date) {
            throw new ValidateDateIntervalError(typeName);
        }
    }
};

class ValidateDateIntervalError extends GNXError {
    constructor(typeName) {
        super(typeName, 'date from cant be less than date to', 'ValidateDateIntervalError');
    }
}

module.exports = {
    ValidateDateInterval
};