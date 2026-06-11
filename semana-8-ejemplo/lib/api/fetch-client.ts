const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token: string = "",
): Promise<T> {
  //   const newHeaders = new Headers();
  //   if (token !== "") {
  //     newHeaders.append("Authorization", `Bearer ${token}`);
  //   }

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      //   ...newHeaders,
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const fetchClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
