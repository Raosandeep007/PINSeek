import useSWR, { SWRConfiguration } from "swr";
import { useFetch } from "./useFetch";
import { PostOffice } from "@/types/models/Pincode";

type Response = {
  data: PostOffice[];
  message: string;
  count: number;
};

export const useGetPincodePlace = (
  { pincode }: { pincode: string },
  options?: SWRConfiguration
) => {
  return useFetch<Response>(
    pincode ? `/api/pincode?pincode=${pincode}` : null,
    options
  );
};
