const PRODUCTION_API_URL =
  "https://bookmanagementapi-production-7272.up.railway.app/api";
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_BASE_URL = (
  import.meta.env.DEV && !configuredApiUrl
    ? "/api"
    : configuredApiUrl || PRODUCTION_API_URL
).replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: options.body
      ? { "Content-Type": "application/json", ...options.headers }
      : options.headers,
    ...options,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(data?.message || `Request failed (${response.status})`);
  return data;
}

export const api = {
  getBooks: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.genre) query.set("genre", params.genre);
    const suffix = query.toString() ? `?${query}` : "";
    return request(`/books${suffix}`);
  },
  getBook: (id) => request(`/books/${id}`),
  createBook: (payload) =>
    request("/books", { method: "POST", body: JSON.stringify(payload) }),
  updateBook: (id, payload) =>
    request(`/books/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteBook: (id) => request(`/books/${id}`, { method: "DELETE" }),
  getAuthors: () => request("/authors"),
  getAuthor: (id) => request(`/authors/${id}`),
  createAuthor: (payload) =>
    request("/authors", { method: "POST", body: JSON.stringify(payload) }),
  updateAuthor: (id, payload) =>
    request(`/authors/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteAuthor: (id) => request(`/authors/${id}`, { method: "DELETE" }),
};

export { API_BASE_URL };
