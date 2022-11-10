import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs/index.js";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { profilesAPIRoute } from "./utils/APIRoutes.js";


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

  dotenv.config();
  const app = express();
  const httpServer = createServer(app);
  const corsOptions = {
    // origin: 'http://localhost:3000',
    credentials: true,
  };
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

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
   context: async ({req}) =>{
    const auth = req ? req.headers.authorization : null;
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const token = auth.substring(7);
      const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const {data} = await axios.get(profilesAPIRoute+`/${decodedToken.user._id}`)
      const currentUser = data;
      return {currentUser}
    }
   }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });

