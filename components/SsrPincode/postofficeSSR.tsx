import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostOffice } from "@/types/models/Pincode";
import { MapPin } from "lucide-react";

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <p className="text-white/60">{title}</p>
      <p className="text-white">{value}</p>
    </div>
  );
};

export default async function PostofficeSSR({
  data: postOffice,
}: {
  data: PostOffice[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {postOffice.map(
        (
          {
            Block,
            BranchType,
            Circle,
            Country,
            DeliveryStatus,
            District,
            Division,
            Name,
            Pincode,
            Region,
            State,
          },
          i
        ) => {
          return (
            <span key={i}>
              <Card
                role="button"
                tabIndex={0}
                className={`bg-gray-900 border-gray-800 transition-all duration-300 hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/20 select-none group hover:scale-x-105 hover:scale-y-125 hover:rotate-1 z-10`}
              >
                <CardHeader className="text-white">
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="group-hover:text-pink-400 group-hover:scale-150 group-hover:rotate-360 transition-all duration-500" />
                    <span className="text-xl font-semibold">{Name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <InfoItem title="Branch Type:" value={BranchType} />
                  <InfoItem title="Delivery Status:" value={DeliveryStatus} />
                  <InfoItem title="Circle:" value={Circle} />
                  <InfoItem title="District:" value={District} />
                  <InfoItem title="Division:" value={Division} />
                  <InfoItem title="Region:" value={Region} />
                  <InfoItem title="Block:" value={Block} />
                  <InfoItem title="State:" value={State} />
                  <InfoItem title="Country:" value={Country} />
                  <InfoItem title="Pincode:" value={Pincode} />
                </CardContent>
              </Card>
            </span>
          );
        }
      )}
    </div>
  );
}
