const graphql = require('graphql');

const StudentType = require('./Types/StudentType');
const getAll = require('../Students/Handlers/GetAll');
const getById = require('../Students/Handlers/GetById');
const add = require('../Students/Handlers/Add');
const update = require('../Students/Handlers/Update');
const deleteAll = require('../Students/Handlers/DeleteAll');
const remove = require('../Students/Handlers/Delete');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLInt } = graphql;

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
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
            type: new GraphQLList(StudentType),
            resolve() {
                const del = deleteAll();

                console.log(del);
                return del;
            }
        },
        delete: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                const del = remove(args);

                console.log(del);
                return del;
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
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return getById(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutations
});
