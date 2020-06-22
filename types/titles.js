const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { GraphQLDate } = require("graphql-iso-date");

const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');
const Title = require('../models/Title').Title;
const Employee = require('../models/Employee').Employee;
const EmployeeType = require('./employees');

const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql;

const {
   ValidateDateInterval
} = require('../validators/datesInterval.validator');

const {
    CantRepeatTitleName
} = require('../validators/titles.validator');

const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represent titles',
    extensions: {
      validations: {
        'CREATE': [
            ValidateDateInterval,
            CantRepeatTitleName
        ],
        'UPDATE': [
            ValidateDateInterval,
            CantRepeatTitleName
        ]
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
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

gnx.connect(Title, TitleType, 'title', 'titles');

module.exports = TitleType;