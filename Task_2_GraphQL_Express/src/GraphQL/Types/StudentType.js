const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt } = graphql;

const StudentType = new GraphQLObjectType({
    name: 'StudentType',
    fields: () => ({
        name:{ type: GraphQLString },
        id: { type: GraphQLString },
        marks: { type: GraphQLList(GraphQLInt) }
    })
});

module.exports = StudentType;
