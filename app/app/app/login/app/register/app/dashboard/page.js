"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return (window.location.href = "/login");

    axios
      .get(process.env.NEXT_PUBLIC_API + "/auth/me", {
        headers: { Authorization: "Bearer " + token }
      })
      .then((res) => setUser(res.data));
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Olá, {user.name}</h1>

      {user.role === "driver" && (
        <a className="block bg-blue-600 text-white p-4 rounded" href="/ride">
          Ver Corridas
        </a>
      )}

      {user.role === "customer" && (
        <a className="block bg-green-600 text-white p-4 rounded" href="/ride">
          Solicitar Corrida
        </a>
      )}

      {user.role === "admin" && (
        <a className="block bg-black text-white p-4 rounded" href="/admin">
          Painel Administrativo
        </a>
      )}
    </main>
  );
}
