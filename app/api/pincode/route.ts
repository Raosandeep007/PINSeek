import { PincodePlace } from "@/types/models/Pincode";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pincode = request.nextUrl.searchParams.get("pincode");

  if (!pincode) {
    return NextResponse.json({ error: "Pincode is required" }, { status: 400 });
  }

  try {
    const data: PincodePlace[] = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    ).then((res) => res.json());

    if (data[0].Status === "404") {
      return NextResponse.json(
        { error: "No data found for the given pincode" },
        { status: 404 }
      );
    }

    if (data[0].Status === "Error") {
      return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
    }

    const count = data[0].PostOffice.length;

    return NextResponse.json(
      {
        data: data[0].PostOffice,
        count,
        message: `Number of Post office(s) found: ${count}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
