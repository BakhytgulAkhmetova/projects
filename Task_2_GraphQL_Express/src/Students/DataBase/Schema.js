const graphql = require('graphql');
const StudentModel = require('./Model');

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = graphql;

// const aa = [{
//     name:'sdsd',
//     id: '1'
// }];

const StudentType = new GraphQLObjectType({
    name: 'StudentType',
    fields: () => ({
        name: GraphQLString
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        students: {
            type: new GraphQLList(StudentType),
            resolve()  {
                return StudentModel.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
});
