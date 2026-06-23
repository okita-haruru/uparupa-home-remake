'use server'

import { redirect } from "next/navigation";

export async function navigateUpdateLog() {
  redirect('/update-log');
}

export async function navigateToPlayer(playerName: string) {
  redirect(`/player/${playerName}`);
}
