"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutComponent() {
  const router = useRouter();

  React.useEffect(() => {
    axios.post(
      "http://localhost:3333/logout",
      {},
      {
        withCredentials: true,
      }
    );

    router.replace("/");
  }, []);
  return <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"></div>;
}
