import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('chat-app-user-jwt');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const httpLink = new HttpLink({
  // Use 'http://'+window.location.host+'/graphql'
    // uri: 'http://localhost:4000/graphql'
    uri: 'http://'+ window.location.host+ '/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
  // Use 'ws://'+window.location.host+'/subscription'
    url: 'ws://localhost:4000/graphql',
    // url: 'ws://'+window.location.host+'/subscription',
    connectionParams: () => {return{
      token: localStorage.getItem('chat-app-user-jwt')
    }},
    options: {
      reconnect: true,
      lazy:true,
    }


    
  }));

const splitLink = split(({query})=>{
    const definition = getMainDefinition(query)
    return(
        definition.kind==='OperationDefinition' && 
        definition.operation ==='subscription'
    )
},wsLink, authLink.concat(httpLink))

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
})
