import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { employeeTypeDefs } from "../schemas/employeeTypeDefs";
import { employeeResolvers } from "../resolvers/employeeResolvers";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { hrTypeDefs } from "../schemas/hrTypeDefs";
import { otpTypeDefs } from "../schemas/otpTypeDefs";
import hrResolvers from "../resolvers/hrResolver";

export const serverInstance = async (httpServer: any) => {
  const server = new ApolloServer({
    typeDefs: [employeeTypeDefs, hrTypeDefs, otpTypeDefs],
    resolvers: [employeeResolvers, hrResolvers],
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
