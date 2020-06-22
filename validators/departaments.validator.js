const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const { Departament } = require('../models/Departament');
const { DepartamentManager } = require('../models/DepartamentManager');
const { DepartamentEmployee } = require('../models/DepartamentEmployee');

const CantRepeatDepartamentName = {
    validate: async function (typeName, originalObj, materializedObject) {
        const DepartamentFinded = await Departament.findOne({'name': materializedObject.name});
       
        if (DepartamentFinded && DepartamentFinded._id != materializedObject.id) {
            throw new CantRepeatDepartamentNameError(typeName);
        }
    }
};

class CantRepeatDepartamentNameError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Cant repeat departament name', 'CantRepeatDepartamentNameError');
    }
}

const CantDeleteDepartamentWithManager = {
    validate: async function(typeName, originalObject, materializeObject) {
        const deptManagerFinded = await DepartamentManager.findOne({'employeeID': originalObject});

        if (deptManagerFinded) {
            throw new CantDeleteDepartamentWithManagerError(typeName);
        }
    }
};

class CantDeleteDepartamentWithManagerError extends GNXError {
    constructor(typeName){
        super(typeName, 'Cannot remove departament with manager', 'CantDeleteDepartamentWithManagerError');
    }
}

const CantDeleteDepartamentWithEmployee = {
    validate: async function(typeName, originalObject, materializeObject) {
        const deptEmployeeFinded = await DepartamentEmployee.findOne({'employeeID': originalObject});

        if (deptEmployeeFinded) {
            throw new CantDeleteDepartamentWithEmployeeError(typeName);
        }
    }
};

class CantDeleteDepartamentWithEmployeeError extends GNXError {
    constructor(typeName){
        super(typeName, 'Cannot remove departament with employees', 'CantDeleteDepartamentWithEmployeeError');
    }
}

module.exports = {
    CantRepeatDepartamentName,
    CantDeleteDepartamentWithManager,
    CantDeleteDepartamentWithEmployee
};