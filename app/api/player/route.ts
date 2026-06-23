import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, PlayerInfo } from "..";
import { API_REQUEST_TIMEOUT_MS, SERVER_API_BASE } from "@/config/apiconfig";
import { getMockPlayer } from "@/data/mock-players";

type PlayerApiPayload = {
  success?: boolean;
  message?: string;
  data?: PlayerInfo;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<PlayerInfo>>> {
  try {
    const username = request.nextUrl.searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing username",
        },
        { status: 400 },
      );
    }

    const mockPlayer = getMockPlayer(username);

    if (mockPlayer) {
      return NextResponse.json({
        success: true,
        message: "Loaded mock player info",
        data: mockPlayer,
      });
    }

    const payload = await axios
      .get(`${SERVER_API_BASE}/playerInfo?username=${username}`, {
        timeout: API_REQUEST_TIMEOUT_MS,
      })
      .then((response) => response.data as PlayerApiPayload);

    if (!payload?.data) {
      return NextResponse.json(
        {
          success: false,
          message: "Player not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Loaded player info",
      data: payload.data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to load player info",
    });
  }
}
