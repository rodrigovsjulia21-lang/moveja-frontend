export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">MoveJá</h1>
      <p className="mt-4 text-gray-600">O seu app de mobilidade.</p>

      <div className="flex flex-col gap-4 mt-8">
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Entrar</a>
        <a href="/register" className="bg-gray-800 text-white px-6 py-3 rounded-lg">Criar Conta</a>
      </div>
    </main>
  );
    }
