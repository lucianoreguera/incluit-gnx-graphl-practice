const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { GraphQLDate } = require("graphql-iso-date");

const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const DepartamentManager = require('../models/DepartamentManager').DepartamentManager;
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

const {
    CantAssignOtherManagerInTheSameTimeFrame
} = require('../validators/departamentManager.validator');

const DepartamentManagerType = new GraphQLObjectType({
    name: 'DepartamentManagerType',
    description: 'Represent manager of a departament',
    extensions: {
      validations: {
        'CREATE': [
            ValidateDateInterval,
            CantAssignOtherManagerInTheSameTimeFrame
        ]
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
        departament: {
            type: DepartmentType,
            extensions: {
                relation: {
                    connectionField: 'departamentID'
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
                    connectionField: 'employeeID'
                },
            },
            resolve(parent, args) {
              return Employee.findById(parent.employeeID);
            },
        }
    })
});

gnx.connect(DepartamentManager, DepartamentManagerType, 'departamentManager', 'departamentsManager');

module.exports = DepartamentManagerType;