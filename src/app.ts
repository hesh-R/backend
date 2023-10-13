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
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const PORT: number = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "https://res.cloudinary.com");

  next();
});

app.use(
  express.json(),
  cors<cors.CorsRequest>({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/employee", employeeRoutes);
app.use("/hr", hrRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to heshR backend");
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
