import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "..";
import { API_REQUEST_TIMEOUT_MS, SERVER_API_BASE } from "@/config/apiconfig";

interface PlayerData {
  uuid: string;
  name: string;
  avatar: string;
}

interface WikiSuggestion {
  key: string;
  title: string;
  thumbnail?: {
    url: string;
  };
}

export interface SearchResult {
  text: string;
  type: "player" | "wiki" | "history";
  icon: string;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<SearchResult[]>>> {
  try {
    const keyword = request.nextUrl.searchParams.get("keyword")?.trim() || "";

    if (!keyword) {
      return NextResponse.json({
        success: true,
        message: "No keyword provided",
        data: [],
      });
    }

    const [players, wikiSuggestion] = await Promise.all([
      axios
        .get(`${SERVER_API_BASE}/players`, {
          timeout: API_REQUEST_TIMEOUT_MS,
        })
        .then((resp) => resp.data.data as PlayerData[])
        .catch(() => []),
      axios
        .get(
          `https://zh.minecraft.wiki/rest.php/v1/search/title?q=${encodeURIComponent(keyword)}&limit=10`,
          {
            timeout: API_REQUEST_TIMEOUT_MS,
          },
        )
        .then((resp) => resp.data.pages as WikiSuggestion[])
        .catch(() => []),
    ]);

    const filteredPlayers = players.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );

    return NextResponse.json({
      success: true,
      message: "Loaded search results",
      data: [
        ...filteredPlayers.map((item) => ({
          text: item.name,
          icon: item.avatar,
          type: "player" as const,
        })),
        ...wikiSuggestion.map((item) => ({
          text: item.title,
          icon: item.thumbnail?.url || "",
          type: "wiki" as const,
        })),
      ],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Failed to load search results: ${error}`,
      data: [],
    });
  }
}
