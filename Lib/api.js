const API_BASE =
  process.env.NEXT_PUBLIC_API ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:3000";

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    method: opts.method || "GET",
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Erro na API");
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}

export default {
  get: (path, token) => request(path, { method: "GET", token }),
  post: (path, body, token) => request(path, { method: "POST", body, token }),
  put: (path, body, token) => request(path, { method: "PUT", body, token }),
  del: (path, token) => request(path, { method: "DELETE", token }),
};
