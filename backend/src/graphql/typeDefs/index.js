import defs from "./defs.js";
import mutations from "./mutation.js";
import query from "./query.js";
import subscriptions from "./subscription.js";

const typeDefs =[defs, mutations, query,subscriptions];

export default typeDefs;