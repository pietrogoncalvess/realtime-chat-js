import "reflect-metadata";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";
import * as cluster from "cluster";
import * as os from "os";
import * as http from "http";
import { setSocketServer } from "./shared/socket/socket.provider";
import { connectDB } from "./config/db";
import { createSessionMiddleware } from "./config/session";
import { createApp } from "./app";

const PORT = 3333;

async function bootstrap() {
  await connectDB();

  const sessionMiddleware = createSessionMiddleware();
  const app = createApp(sessionMiddleware);

  if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: false,
      },
      transports: ["websocket", "polling"],
    });

    const pubClient = createClient({
      url: process.env.REDIS_URI || "redis://localhost:6379",
      socket: {
        reconnectStrategy: (retries: any) => Math.min(retries * 50, 500),
      },
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    console.log(`Worker ${process.pid}: Socket.IO with Redis adapter initialized`);
    setSocketServer(io);

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id} no worker ${process.pid}`);

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    server.listen(PORT, () => {
      console.log(`Worker ${process.pid} running on port ${PORT}`);
    });
  }
}

bootstrap();
