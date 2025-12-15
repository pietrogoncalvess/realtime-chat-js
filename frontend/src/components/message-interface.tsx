"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { socket } from "@/services/socket";

interface User {
  _id: string;
  name: string;
  username: string;
}

interface Message {
  _id: string;
  from: string;
  to: string;
  message: string;
}

export function MessageInterface() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [chats, setChats] = React.useState<User[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = React.useState<User | null>(null);
  const [messageText, setMessageText] = React.useState("");
  const [onlineUsersIds, setOnlineUsersIds] = React.useState<string[]>([]);

  const meRef = React.useRef<User | null>(null);
  const selectedChatRef = React.useRef<User | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    getMeInfo();

    socket.connect();
    socket.on("receive_message", (data: Message) => {
      const isChatSelected = data.from === selectedChatRef.current?._id || data.to === selectedChatRef.current?._id;
      const isMyMessage = data.from === meRef.current?._id;

      if (isChatSelected && !isMyMessage) {
        appendMessage(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!isAuthenticated || !meRef.current) return;
    getChats();
  }, [isAuthenticated]);

  React.useEffect(() => {
    selectedChatRef.current = selectedChat ?? null;
    getUsersStatus();

    if (!selectedChat) {
      setSelectedChat(chats[0]);
      return;
    }

    getMessages(selectedChat._id);
  }, [selectedChat]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMeInfo = async () => {
    try {
      const me = await axios.get<User>("http://localhost:3333/me", { withCredentials: true });

      meRef.current = me.data;
      setIsAuthenticated(true);
    } catch (err) {
      console.log("Error fetching me info, redirecting to login");
      router.replace("/");
      console.log(err);
    }
  };

  const getChats = async () => {
    const chats = await axios.get<User[]>("http://localhost:3333/users", { withCredentials: true });
    setChats(chats.data.filter((chat) => chat._id !== meRef.current?._id));
  };

  const getMessages = async (chatId: string) => {
    const messages = await axios.get<Message[]>(`http://localhost:3333/chat/${chatId}/messages`, { withCredentials: true });

    setMessages(messages.data);
  };

  const getUsersStatus = async () => {
    const onlineUsersIds = await axios.get<string[]>("http://localhost:3333/users/online", { withCredentials: true });

    setOnlineUsersIds(onlineUsersIds.data);
  };

  const handleSendMessage = async () => {
    if (!selectedChat) return;

    const response = await axios.post(
      "http://localhost:3333/chat/message",
      {
        to: selectedChat._id,
        message: messageText,
      },
      { withCredentials: true }
    );

    setMessageText("");

    appendMessage(response.data);
  };

  const appendMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectedChatIsOnline = React.useMemo(() => {
    if (!selectedChat) return false;
    if (!onlineUsersIds.includes(selectedChat._id)) return false;

    return true;
  }, [onlineUsersIds]);
  return (
    <div className="relative z-10 h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl h-[600px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex">
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Mensagens</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                  selectedChat?._id === chat._id ? "bg-blue-50" : ""
                }`}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={"/placeholder.svg"} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{chat.name}</div>
                  <div className="text-sm text-gray-500 truncate">{chat?.username}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={"/placeholder.svg"} alt={selectedChat?.name} />
                <AvatarFallback>{selectedChat?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">{selectedChat?.name}</div>

                {selectedChatIsOnline && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    Online
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium text-gray-900">{meRef.current?.name}</div>
              <div className="text-sm text-gray-500">{meRef.current?.username}</div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
            <div className="space-y-4">
              {messages.map(({ _id, from, message, to }) => {
                const isMyMessage = meRef.current?._id === from;

                return (
                  <div key={_id} className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md rounded-2xl px-4 py-3 ${isMyMessage ? "bg-blue-500 text-white" : "bg-white text-gray-900"}`}>
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Digite sua mensagem aqui"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 h-12 bg-gray-50 border-gray-200 rounded-xl"
              />
              <Button className="px-6 h-12 bg-gray-900 text-white hover:bg-gray-800 rounded-xl font-medium" onClick={handleSendMessage}>
                Enviar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
