'use strict';

const gql = require('graphql-sync');

const db = require('@arangodb').db;

const hrSystem = db._collection('HRSystem');

let hrtype;

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

const DevicesType = new gql.GraphQLObjectType({
    name: 'DevicesType',
    fields() {
        return {
            computer: {
                type: new gql.GraphQLList(ComputerType)
            },
            phone: {
                type: new gql.GraphQLList(PhoneType)
            }
        };
    }
});

const ComputerType = new gql.GraphQLObjectType({
    name: 'ComputerType',
    fields() {
        return {
            SN: {
                type: gql.GraphQLString
            },
            initial_date: {
                type: gql.GraphQLString
            }
        };
    }
});

const RolesType = new gql.GraphQLObjectType({
    name: 'RolesType',
    fields() {
        return {
            title: {
                type: gql.GraphQLString
            },
            start_date: {
                type: gql.GraphQLString
            }
        };
    }
});

const PhoneType = new gql.GraphQLObjectType({
    name: 'PhoneType',
    fields() {
        return {
            IMEI_number: {
                type: gql.GraphQLString
            },
            SN: {
                type: gql.GraphQLString
            },
            initial_date: {
                type: gql.GraphQLString
            },
            end_date: {
                type: gql.GraphQLString
            }
        };
    }
});

hrtype = new gql.GraphQLObjectType({
    name: 'person',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                resolve(hrSystem) {
                    return hrSystem._key;
                }
            },
            name: {
                type: gql.GraphQLString,
            },
            surname: {
                type: gql.GraphQLString,
            },
            department: {
                type: gql.GraphQLString,
            },
            official_mail: {
                type: gql.GraphQLString,
            },
            devices: {
                type: DevicesType,
            },
            roles: {
                type: new gql.GraphQLList(RolesType)
            }
        };
    }
});


module.exports = new gql.GraphQLSchema({
    query: queryHRType
});
