const graphql = require('graphql');

const StudentType = require('./Types/StudentType');
const getAll = require('../Students/Handlers/GetAll');
const getById = require('../Students/Handlers/GetById');
const add = require('../Students/Handlers/Add');
const update = require('../Students/Handlers/Update');
const deleteAll = require('../Students/Handlers/DeleteAll');
const remove = require('../Students/Handlers/Delete');
const bestStudent = require('../Students/Handlers/GetBestStudent');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt } = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: {
            type: StudentType,
            args: {
                name: { type: GraphQLString },
                id: { type: GraphQLString },
                marks: { type: new GraphQLList(GraphQLInt) }
            },
            resolve(parent, args) {
                return add(args);
            }
        },
        update: {
            type: StudentType,
            args: {
                name: { type: GraphQLString },
                id: { type: GraphQLString },
                marks: { type: new GraphQLList(GraphQLInt) }
            },
            resolve(parent, args) {
                return update(args);
            }
        },
        deleteAll: {
            type: GraphQLString,
            resolve() {
                return deleteAll;
            }
        },
        delete: {
            type: StudentType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return remove(args);
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        students: {
            type: new GraphQLList(StudentType),
            resolve() {
                return getAll();
            }
        },
        student: {
            type: StudentType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return getById(args.id);
            }
        },
        best: {
            type: StudentType,
            resolve() {
                return bestStudent();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
