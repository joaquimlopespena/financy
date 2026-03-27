import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { app } from "./app";
import { AuthResolver } from "./modules/auth/auth.resolver";
import { UserResolver } from "./modules/users/user.resolver";
import { buildContext } from "./graphql/context";

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver, AuthResolver],
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
        expressMiddleware(server, { context: buildContext })
      );
    
      app.listen(3000, () => {
        console.log(`🚀 Server ready at http://localhost:3000/graphql`);
      });
}

bootstrap();