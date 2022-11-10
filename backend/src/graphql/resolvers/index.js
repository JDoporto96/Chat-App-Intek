import merge from 'lodash.merge';
import mutationResolvers from './mutation.js';
import queryResolvers from './query.js';
import subscriptionResolvers from './subscription.js';

const resolvers = merge({},mutationResolvers, queryResolvers,subscriptionResolvers);

export default resolvers;