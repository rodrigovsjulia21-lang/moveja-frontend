"use client";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API + "/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (e) {
      setError("Email ou senha incorretos");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        className="w-full border p-3 rounded mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-3 rounded mb-3"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-600 text-white w-full py-3 rounded" onClick={submit}>
        Entrar
      </button>
    </div>
  );
}
