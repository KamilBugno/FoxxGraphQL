'use strict';

const gql = require('graphql-sync');

const db = require('@arangodb').db;

const hrSystem = db._collection('HRSystem');

let hrtype, personInterface;

const queryHRType = new gql.GraphQLObjectType({
    name: 'Query',
    fields() {
        return {
            person: {
                type: hrtype,
                args: {
                    id: {
                        description: 'id of the person',
                        type: new gql.GraphQLNonNull(gql.GraphQLString)
                    }
                },
                resolve(root, args) {
                    return hrSystem.firstExample({
                        _key: args.id
                    });
                }
            }
        };
    }
});

hrtype = new gql.GraphQLObjectType({
    name: 'person',
    description: 'A humanoid creature in the Star Wars universe.',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the human.',
                resolve(hrSystem) {
                    return hrSystem._key;
                }
            },
            name: {
                type: gql.GraphQLString,
                description: 'The name of the human.'
            },
            surname: {
                type: gql.GraphQLString,
                description: 'The home planet of the human, or null if unknown.'
            },
            department: {
                type: gql.GraphQLString,
                description: 'The name of the human.'
            },
            official_mail: {
                type: gql.GraphQLString,
                description: 'The home planet of the human, or null if unknown.'
            }
        };
    }
});


module.exports = new gql.GraphQLSchema({
    query: queryHRType
});
