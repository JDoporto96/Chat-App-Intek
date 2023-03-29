import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import resolvers from "./graphql/resolvers/resolvers.js";
import typeDefs from "./graphql/typeDefs/index.js";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { profilesAPIRoute } from "./utils/APIRoutes.js";
// import cors from 'cors'



// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.

const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema,context: async(ctx,msg,args)=>{
  return getDynamicContext(ctx, msg, args);
},
}, wsServer);


const secret = process.env.ACCESS_TOKEN_SECRET
const findUser= async(token) =>{
  const decodedToken= jwt.verify(token, secret );
  const {data} = await axios.get(profilesAPIRoute+`/${decodedToken.user._id}`)
  const currentUser = data;
  return {currentUser}
}

const context = async ({req}) =>{
      const auth = req ? req.headers.authorization : null;
      if(auth && auth.toLowerCase().startsWith('bearer ')){
        const token = auth.substring(7);
       return findUser(token)
      }
}

const getDynamicContext = async (ctx, msg, args) => {
  if(ctx.connectionParams.token){
    const currentUser = await findUser(ctx.connectionParams.token)
    return currentUser
  }
  return { currentUser: null };
};
// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  introspection: false,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});



await server.start();
app.use('/graphql',bodyParser.json(), expressMiddleware(server,{context}));

const PORT= process.env.PORT;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});