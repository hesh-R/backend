import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { employeeTypeDefs } from "../schemas/employeeTypeDefs";
import { employeeResolvers } from "../resolvers/employeeResolvers";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

export const serverInstance = async (httpServer: any) => {
  const server = new ApolloServer({
    typeDefs: [employeeTypeDefs],
    resolvers: [employeeResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  return server;
};

export const connectApolloServer = async (httpServer: any) => {
  try {
    const server = await serverInstance(httpServer);
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Apollo server ready at: ${url}`);
  } catch (error) {
    console.log("Error connecting to apollo server", error);
  }
};
