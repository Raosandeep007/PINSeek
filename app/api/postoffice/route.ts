import { PostofficePincode } from "@/types/models/Pincode";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const postoffice = request.nextUrl.searchParams.get("postoffice");

  if (!postoffice) {
    return NextResponse.json(
      { error: "Postoffice is required" },
      { status: 400 }
    );
  }

  try {
    const data: PostofficePincode[] = await fetch(
      `https://api.postalpincode.in/postoffice/${postoffice}`
    ).then((res) => res.json());

    if (data[0].Status === "404") {
      return NextResponse.json(
        { error: "No data found for the given postoffice" },
        { status: 404 }
      );
    }

    if (data[0].Status === "Error") {
      return NextResponse.json(
        { error: "Invalid postoffice" },
        { status: 400 }
      );
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
