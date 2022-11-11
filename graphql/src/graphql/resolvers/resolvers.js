import merge from 'lodash.merge';
import mutationResolvers from './mutation.js';
import queryResolvers from './query.js';


const resolvers = merge({}, queryResolvers,mutationResolvers)

export default resolvers