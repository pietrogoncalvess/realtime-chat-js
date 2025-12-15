import "reflect-metadata";
import cluster from "node:cluster";
import os from "node:os";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import { setSocketServer } from "./shared/socket/socket.provider";
import { createSessionMiddleware } from "./config/session";
import { createApp } from "./app";
import { User } from "./models/User";
import { hash } from "bcryptjs";

const PORT = 3333;

async function bootstrap() {
  await connectDB();

  const sessionMiddleware = createSessionMiddleware();

  const app = createApp(sessionMiddleware);

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  setSocketServer(io);

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} rodando na porta ${PORT}`);
  });
}

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} morreu. Criando outro...`);
    cluster.fork();
  });
} else {
  bootstrap();
}
