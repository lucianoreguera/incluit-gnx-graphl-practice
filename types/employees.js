const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { GraphQLDate } = require("graphql-iso-date");

const Employee = require('../models/Employee').Employee;
const GenderTypeEnum = require('./enums/gender.enum');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const {
    GraphQLString, 
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType, 
} = graphql;

const {
    CantRepeatDni,
    ValidateLegalAge,
    CantDeleteEmployeeWithSalary,
    CantDeleteEmployeeWithTitle,
    CantDeleteEmployeeWithDepartamentManager,
    CantDeleteEmployeeWithDepartamentEmployee
} = require('../validators/employees.validator');


const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent employees',
    extensions: {
        validations: {
            'CREATE': [
                CantRepeatDni,
                ValidateLegalAge
            ],
            'UPDATE': [
                CantRepeatDni,
                ValidateLegalAge
            ],
            'DELETE': [
                CantDeleteEmployeeWithSalary,
                CantDeleteEmployeeWithTitle,
                CantDeleteEmployeeWithDepartamentManager,
                CantDeleteEmployeeWithDepartamentEmployee
            ],
        },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        dni: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        birth_date: { type: GraphQLDate },
        hire_date: { type: GraphQLDate },
        gender: { type: GenderTypeEnum },
    })
});

gnx.connect(Employee, EmployeeType, 'employee', 'employees');

module.exports = EmployeeType;