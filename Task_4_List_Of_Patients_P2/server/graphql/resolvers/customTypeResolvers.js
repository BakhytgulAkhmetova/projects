
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

/* Definition scalar type Date*/
const date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
});

module.exports = { date };
