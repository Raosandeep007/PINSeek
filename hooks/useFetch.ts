import useSWR, { SWRConfiguration } from "swr";

export const useFetch = <T>(url: string | null, options?: SWRConfiguration) => {
  return useSWR<T, BackendError>(
    url,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      return res.json();
    },
    options
  );
};
