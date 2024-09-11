import { PostOffice } from "@/types/models/Pincode";
import Form from "../../components/SsrPincode/form";
import PostofficeSSR from "../../components/SsrPincode/postofficeSSR";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getData = async ({ pincode }: { pincode: number }) => {
  try {
    const res = await fetch(`${baseUrl}/api/pincode?pincode=${pincode}`);
    const data = await res.json();

    if (!res.ok) {
      return { data: [], message: data.error } as {
        data: PostOffice[];
        message: string;
      };
    }

    return { data: data.data, message: "" } as {
      data: PostOffice[];
      message: string;
    };
  } catch (error) {}
};

export default async function Page({
  searchParams,
}: {
  searchParams: { pincode?: string };
}) {
  const pincode = searchParams.pincode ? Number(searchParams.pincode) : 0;
  const data = await getData({
    pincode: pincode,
  });

  const { data: postOffice = [], message = "" } = data || {};

  return (
    <section className="relative m-10 min-h-dvh">
      <div className="flex flex-col justify-center space-y-6 ">
        <Form pincode={pincode} />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          {message}
        </h1>
        <PostofficeSSR data={postOffice} />
      </div>
    </section>
  );
}
