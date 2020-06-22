const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const { Title } = require('../models/Title');

const CantRepeatTitleName = {
    validate: async function (typeName, originalObj, materializedObject) {
        const titleFinded = await Title.findOne({'title': materializedObject.title});
       
        if (titleFinded && titleFinded._id != materializedObject.id) {
            throw new CantRepeatTitleNameError(typeName);
        }
    }
};

class CantRepeatTitleNameError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Cant repeat title', 'CantRepeatTitleNameError');
    }
}

module.exports = {
    CantRepeatTitleName
};