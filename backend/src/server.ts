import "reflect-metadata";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import { setupSocket } from "./socket";

connectDB();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

setupSocket(io);

server.listen(3333, () => console.log("Backend rodando na porta 3333"));
