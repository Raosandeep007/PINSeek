import useSWR, { SWRConfiguration } from "swr";
import { useFetch } from "./useFetch";
import { PostofficePincode } from "@/types/models/Pincode";

type Response = {
  data: PostofficePincode["PostOffice"];
  message: string;
  count: number;
};

export const useGetPlacePincode = (
  { postoffice }: { postoffice: string },
  options?: SWRConfiguration
) => {
  return useFetch<Response>(
    postoffice ? `/api/postoffice?postoffice=${postoffice}` : null,
    options
  );
};
