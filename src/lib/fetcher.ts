export type JsonFetcherOptions = {
  signal?: AbortSignal;
};

export async function jsonFetcher<T>(url: string, options: JsonFetcherOptions = {}): Promise<T> {
  const controller = !options.signal ? new AbortController() : null;
  const response = await fetch(url, {
    method: "GET",
    signal: options.signal ?? controller?.signal,
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) ${response.statusText}`);
  }

  return (await response.json()) as T;
}
