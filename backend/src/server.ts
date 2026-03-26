import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { app } from "./app";
import { HealthResolver } from "./graphql/health.resolver";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [HealthResolver],
        validate: false,
        emitSchemaFile: './src/schema.graphql',
    })

    const server = new ApolloServer({
        schema,
    })

    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({ origin: '*', credentials: true }),
        express.json(),
        expressMiddleware(server, { context: async () => ({}) })
      );
    
      app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
      });
}

bootstrap();