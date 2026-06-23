import axios from "axios";
import { NextResponse } from "next/server";

const SPONSORS_JSON_URL =
  "https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-sponsors/main/sponsors.json";
const REQUEST_TIMEOUT_MS = 8000;

export interface SponsorInfo {
  avatar: string;
  name: string;
  amount: string;
  date: string;
}

export interface GetSponsorsResponse {
  sponsors: SponsorInfo[];
  success: boolean;
  error?: string;
}

const fallbackResponse: GetSponsorsResponse = {
  sponsors: [],
  success: false,
};

export async function GET(): Promise<NextResponse<GetSponsorsResponse>> {
  try {
    const { data } = await axios.get<SponsorInfo[]>(SPONSORS_JSON_URL, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    if (!Array.isArray(data)) {
      return NextResponse.json({
        ...fallbackResponse,
        error: "Invalid sponsor data format",
      });
    }

    return NextResponse.json({ sponsors: data, success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching sponsors data:", error.message);
    } else {
      console.error("Unknown error fetching sponsors data:", error);
    }

    return NextResponse.json({
      ...fallbackResponse,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
