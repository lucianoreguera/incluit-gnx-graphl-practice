const graphql = require('graphql');
const gnx = require('@simtlix/gnx');

const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');
const { Departament } = require('../models/Departament');

const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql;

const {
   CantRepeatDepartamentName,
   CantDeleteDepartamentWithManager,
   CantDeleteDepartamentWithEmployee
} = require('../validators/departaments.validator');

const DepartamentType = new GraphQLObjectType({
    name: 'DepartamentType',
    description: 'Represent departaments',
    extensions: {
      validations: {
        'CREATE': [
            CantRepeatDepartamentName
        ],
        'UPDATE': [
            CantRepeatDepartamentName
        ],
        'DELETE': [
            CantDeleteDepartamentWithManager,
            CantDeleteDepartamentWithEmployee
        ]
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
    })
});

gnx.connect(Departament, DepartamentType, 'departament', 'departaments');

module.exports = DepartamentType;