import BackendAPI from "../constants/BackendAPI";

export async function callAPI(input: {
  method: "POST" | "GET";
  pathname: string;
  body?: object;
  token?: string | null;
}) {
  try {
    const url = BackendAPI.backendOrigin + input.pathname;
    const init: RequestInit = {
      method: input.method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + input.token,
      },
    };
    if (input.body) {
      init.body = JSON.stringify(input.body);
    }
    const res = await fetch(url, init);
    const result = await res.json();
    return result;
  } catch (error) {
    return { error: String(error) };
  }
}
