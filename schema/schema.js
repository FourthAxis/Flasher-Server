const graphql = require('graphql');
const _ = require('lodash');

const users = [
    { id: '1', firstName: 'Benny', age: 22}, 
    { id: '2', firstName: 'Bonny', age: 44}
];

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id:{ type:GraphQLString },
        firstName: { type:GraphQLString },
        age:{ type:GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})