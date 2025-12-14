import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Conectado:", socket.id);

    socket.on("send_message", (data: string) => {
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado");
    });
  });
}
