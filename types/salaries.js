const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { GraphQLDate } = require("graphql-iso-date");

const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');
const { Salary } = require('../models/Salary');
const { Employee } = require('../models/Employee');
const EmployeeType = require('./employees');

const {
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql;

const {
   ValidateDateInterval 
} = require('../validators/datesInterval.validator');

const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent salaries',
    extensions: {
      validations: {
        'CREATE': [
            ValidateDateInterval
        ],
        'UPDATE': [
            ValidateDateInterval
        ]
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        salary: { type: GraphQLInt },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    connectionField: "employeeID",
                    embedded: false
                }
            },
            resolve(parent, args) {
                return Employee.findById(parent.employeeID);
            }
        },
    })
});

gnx.connect(Salary, SalaryType, 'salary', 'salaries');

module.exports = SalaryType;