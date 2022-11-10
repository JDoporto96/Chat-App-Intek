import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const subscriptionResolvers = {
   Subscription:{
    newMessage:{
      subscribe: (_, {conversationId }) => {
        return pubsub.asyncIterator([`MESSAGE_SENT_TO_${conversationId}`]);
      },
    }
   }
  }
  export default subscriptionResolvers;
  
