export type PostOffice = {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
};

export type PincodePlace = {
  Status: "Success" | "404" | "Error";
  PostOffice: PostOffice[];
  Message: string;
};
