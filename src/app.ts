import express, { Request, Response } from "express";
import { connectDb } from "./config/dbConfig";
import {
  connectApolloServer,
  serverInstance,
} from "./config/apolloServerConfig";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import employeeRoutes from "./routes/employee";
import hrRoutes from "./routes/hr";
import { cloudinaryMiddleware } from "./utils/cloudinary";

const app = express();
const httpServer = http.createServer(app);
const PORT: number = 3000;
app.use(express.json(), cors<cors.CorsRequest>());
app.use(morgan("dev"));
app.use("/employee", employeeRoutes);
app.use("/hr", hrRoutes);
app.use(cloudinaryMiddleware);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express App!");
});
const connectServer = async () => {
  const server = await serverInstance(httpServer);
  await server.start();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
};
connectDb();
connectServer();
connectApolloServer(httpServer);
