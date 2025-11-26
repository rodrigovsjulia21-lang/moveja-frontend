"use client";
import { useState } from "react";
import axios from "axios";

export default function Ride() {
  const [price, setPrice] = useState("");

  async function createRide() {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      process.env.NEXT_PUBLIC_API + "/payments/create",
      {
        amount: Number(price),
        driverId: 1, // temporário
        rideId: 1    // temporário
      },
      { headers: { Authorization: "Bearer " + token } }
    );

    alert("Pagamento criado! ID: " + res.data.id);
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Solicitar Corrida</h1>

      <input
        type="number"
        placeholder="Valor da corrida"
        className="border p-3 w-full rounded mb-3"
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="bg-blue-600 text-white w-full py-3 rounded" onClick={createRide}>
        Criar Pagamento
      </button>
    </div>
  );
}
