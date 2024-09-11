import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const Form = ({ pincode }: { pincode: number }) => {
  return (
    <form className="sticky top-3 z-10">
      <fieldset className="flex items-center gap-4 w-full px-3">
        <Logo />
        <Input
          type="number"
          minLength={6}
          name="pincode"
          placeholder="Search new pincode"
          defaultValue={pincode || ""}
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <MapPin className="mr-2 h-4 w-4" />
          Search
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
