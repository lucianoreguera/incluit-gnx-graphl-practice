const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { GraphQLDate } = require("graphql-iso-date");

const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const DepartamentEmployee = require('../models/DepartamentEmployee').DepartamentEmployee;
const Departament = require('../models/Departament').Departament;
const Employee = require('../models/Employee').Employee;

const DepartmentType = require('./departaments');
const EmployeeType = require('./employees');

const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql;

const {
   ValidateDateInterval
} = require('../validators/datesInterval.validator');

const DepartamentEmployeeType = new GraphQLObjectType({
    name: 'DepartamentEmployeeType',
    description: 'Represent employees of a departament',
    extensions: {
      validations: {
        'CREATE': [
            ValidateDateInterval
        ]
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
        department: {
            type: DepartmentType,
            extensions: {
                relation: {
                    connectionField: 'departamentID',
                },
            },
            resolve(parent, args) {
              return Departament.findById(parent.departmentID);
            },
        },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    connectionField: 'employeeID',
                },
            },
            resolve(parent, args) {
              return Employee.findById(parent.employeeID);
            },
        },
    })
});

gnx.connect(DepartamentEmployee, DepartamentEmployeeType, 'departamentEmployee', 'departamentsEmployee');

module.exports = DepartamentEmployeeType;