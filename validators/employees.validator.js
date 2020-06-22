const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const moment = require('moment');

const { Employee } = require('../models/Employee');
const { Title } = require('../models/Title');
const { Salary } = require('../models/Salary');
const { DepartamentManager } = require('../models/DepartamentManager');
const { DepartamentEmployee } = require('../models/DepartamentEmployee');

const CantRepeatDni = {
    validate: async function(typeName, originalObject, materializedObject) {
        const EmployeeFinded =  await Employee.findOne({ 'dni': materializedObject.dni });
        
        if (EmployeeFinded && EmployeeFinded._id != materializedObject.id) {
            throw new CantCreateOrUpdateEmployeeWithDuplicateDniError(typeName);
        }
    }
};

class CantCreateOrUpdateEmployeeWithDuplicateDniError extends GNXError {
    constructor(typeName) {
        super(typeName, 'DNI cant be repeated', 'CantCreateOrUpdateEmployeeWithDuplicateDniError');
    }
}

const ValidateLegalAge = {
    validate: async function(typeName, originalObject, materializedObject) {
        const birthDate = moment(materializedObject.birth_date);
        const currentDate = moment();
        const years = currentDate.diff(birthDate, 'years');

        if (years < 18) {
            throw new ValidateLegalAgeError(typeName);
        }
    }
};

class ValidateLegalAgeError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Employee cannot be under 18 years of age', 'ValidateLegalAgeError');
    }
}

const CantDeleteEmployeeWithSalary = {
    validate: async function(typeName, originalObject, materializeObject) {
        const salaryFinded = await Salary.findOne({'employeeID': originalObject});

        if (salaryFinded) {
            throw new CantDeleteEmployeeWithSalaryError(typeName);
        }
    }
};

class CantDeleteEmployeeWithSalaryError extends GNXError {
    constructor(typeName){
        super(typeName, 'You cannot eliminate a salaried employee', 'CantDeleteEmployeeWithSalaryError');
    }
}

const CantDeleteEmployeeWithTitle = {
    validate: async function(typeName, originalObject, materializeObject) {
        const titleFinded = await Title.findOne({'employeeID': originalObject});

        if (titleFinded) {
            throw new CantDeleteEmployeeWithTitleError(typeName);
        }
    }
};

class CantDeleteEmployeeWithTitleError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Cannot remove employee with title', 'CantDeleteEmployeeWithTitleError');
    }
}

const CantDeleteEmployeeWithDepartamentManager = {
    validate: async function(typeName, originalObject, materializeObject) {
        const deptManagerFinded = await DepartamentManager.findOne({'employeeID': originalObject});

        if (deptManagerFinded) {
            throw new CantDeleteEmployeeWithDepartamentManagerError(typeName);
        }
    }
};

class CantDeleteEmployeeWithDepartamentManagerError extends GNXError{
    constructor(typeName) {
        super(typeName, 'You cannot delete an employee assigned to a department', 'CantDeleteEmployeeWithDepartamentManagerError');
    }
}

const CantDeleteEmployeeWithDepartamentEmployee = {
    validate: async function(typeName,originalObject,materializeObject){
        const deptEmployeeFinded = await DepartamentEmployee.findOne({'employeeID': originalObject});

        if (deptEmployeeFinded) {
            throw new CantDeleteEmployeeWithDepartamentEmployeeError(typeName);
        }
    }
};

class CantDeleteEmployeeWithDeptEmployeeError extends GNXError {
    constructor(typeName){
        super(typeName, 'You cannot delete an employee assigned to a department', 'CantDeleteEmployeeWithDepartamentEmployee');
    }
}
module.exports = {
    CantRepeatDni,
    ValidateLegalAge,
    CantDeleteEmployeeWithSalary,
    CantDeleteEmployeeWithTitle,
    CantDeleteEmployeeWithDepartamentManager,
    CantDeleteEmployeeWithDepartamentEmployee
};
