import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div
      className="w-full flex items-center justify-center min-h-dvh"
      key="loader"
    >
      <Loader />
    </div>
  );
}
