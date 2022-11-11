import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import resolvers from "./graphql/resolvers/resolvers.js";
import typeDefs from "./graphql/typeDefs/index.js";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { profilesAPIRoute } from "./utils/APIRoutes.js";


// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
dotenv.config();
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
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

const secret = process.env.ACCESS_TOKEN_SECRET

const context = async ({req}) =>{
      const auth = req ? req.headers.authorization : null;
      if(auth && auth.toLowerCase().startsWith('bearer ')){
        const token = auth.substring(7);
        const decodedToken= jwt.verify(token, secret );
        const {data} = await axios.get(profilesAPIRoute+`/${decodedToken.user._id}`)
        const currentUser = data;
        return {currentUser}
      }
}

await server.start();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server,{context}));

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});