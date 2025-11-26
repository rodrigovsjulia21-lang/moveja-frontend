"use client";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  async function submit() {
    await axios.post(process.env.NEXT_PUBLIC_API + "/auth/register", form);
    window.location.href = "/login";
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Conta</h1>

      <input className="border p-3 w-full rounded mb-3" placeholder="Nome"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input className="border p-3 w-full rounded mb-3" placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input className="border p-3 w-full rounded mb-3" placeholder="Senha"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="border p-3 w-full rounded mb-3"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Passageiro</option>
        <option value="driver">Motorista</option>
      </select>

      <button className="bg-green-600 text-white w-full py-3 rounded" onClick={submit}>
        Registrar
      </button>
    </div>
  );
}
