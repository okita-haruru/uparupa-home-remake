import axios from "axios";
import { NextResponse } from "next/server";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/Ave-CRYCHIC/uparupa-whatsnew/refs/heads/main/whatsnew.json";
const REQUEST_TIMEOUT_MS = 8000;

interface ChangeLogItem {
  title: string;
  details: string[];
}

interface ChangeLogEntry {
  version: string;
  "release-date": string;
  items: ChangeLogItem[];
}

export async function GET() {
  try {
    const changeLog = await axios.get<ChangeLogEntry[]>(CHANGELOG_URL, {
      timeout: REQUEST_TIMEOUT_MS,
    });

    if (!Array.isArray(changeLog.data)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(changeLog.data);
  } catch (error) {
    console.error("Failed to fetch changelog:", error);
    return NextResponse.json([]);
  }
}
