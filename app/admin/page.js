"use client";

import { useEffect, useState } from "react";
import Api from "../../lib/api";

export default function AdminPage() {
  const [pending, setPending] = useState([]);
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token") || "";
    setToken(t);
  }, []);

  async function loadPending() {
    setLoading(true);
    try {
      const res = await Api.get("/admin/users/pending", token);
      setPending(res || []);
    } catch (e) {
      alert("Erro ao carregar pendentes: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    if (!confirm("Aprovar este usuário?")) return;
    try {
      await Api.post(`/admin/users/${id}/approve`, {}, token);
      loadPending();
    } catch (e) {
      alert("Erro ao aprovar: " + (e.message || e));
    }
  }

  async function reject(id) {
    if (!confirm("Rejeitar este usuário?")) return;
    try {
      await Api.post(`/admin/users/${id}/reject`, {}, token);
      loadPending();
    } catch (e) {
      alert("Erro ao rejeitar: " + (e.message || e));
    }
  }

  async function loadFees() {
    try {
      const res = await Api.get("/admin/platform/fees", token);
      setFees(res);
    } catch (e) {
      alert("Erro ao buscar fees: " + (e.message || e));
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Painel Admin - MoveJá</h1>

      <div className="mb-4 flex gap-2">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={loadPending} disabled={loading}>
          Carregar Cadastros Pendentes
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={loadFees}>
          Ver Taxa Acumulada
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastros Pendentes</h2>
        {loading && <p>Carregando...</p>}
        {!loading && pending.length === 0 && <p className="text-gray-500">Nenhum cadastro pendente.</p>}
        <div className="space-y-3">
          {pending.map((u) => (
            <div key={u.id} className="p-3 bg-white rounded shadow flex items-center justify-between">
              <div>
                <div className="font-semibold">{u.name || u.email}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
                <div className="text-xs text-gray-400">Papel: {u.role}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approve(u.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Aprovar</button>
                <button onClick={() => reject(u.id)} className="bg-red-500 text-white px-3 py-1 rounded">Rejeitar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Resumo da Taxa da Plataforma</h2>
        {fees ? (
          <pre className="bg-white p-4 rounded shadow">
            {JSON.stringify(fees, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500">Clique em "Ver Taxa Acumulada".</p>
        )}
      </section>
    </div>
  );
}
