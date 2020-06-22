const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const { DepartamentManager } = require('../models/DepartamentManager');

const CantAssignOtherManagerInTheSameTimeFrame = {
    validate: async function(typeName, originalObject, materializedObject) {
        const DeptManagerFinded = await DepartamentManager.findOne({ 'departament': materializedObject.departament });

        if (DeptManagerFinded) {
            const fromDate = moment(materializedObject.from_date);
            const toDate = moment(materializedObject.to_date);

            const range = moment.range(fromDate, toDate);

            if ( range.contains(fromDate) || range.contains(toDate) ) {
                throw new CantAssignOtherManagerInTheSameTimeFrameError(typeName);
            } 
        }
    }
};

class CantAssignOtherManagerInTheSameTimeFrameError extends GNXError {
    constructor(typeName) {
        super(typeName, 'you cannot assign another manager in the same time frame', 'CantAssignOtherManagerInTheSameTimeFrameError');
    }
}

module.exports = {
    CantAssignOtherManagerInTheSameTimeFrame
};