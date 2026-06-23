import {NextResponse} from "next/server";
import axios from "axios";

const GITHUB_API_URL = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const ORGANIZATION = process.env.ORGANIZATION;

const headers = {
  'Authorization': `token ${TOKEN}`
};

async function getContributorStats(repoFullName: string) {
  const url = `${GITHUB_API_URL}/repos/${repoFullName}/stats/contributors`;
  let response = await axios.get(url, {headers});

  // Polling until the data is ready
  while (response.status === 202) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    response = await axios.get(url, {headers});
  }

  return response.data;
}

interface GithubRepo {
  full_name: string;
}

interface GithubMember {
  login: string;
}

interface Contribution {
  [login: string]: { commits: number, additions: number, deletions: number }
}

export interface GithubContribution {
  id: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface GithubContributionApiResult {
  error: string;
  status: number;
  data: GithubContribution[];
}

export async function GET(): Promise<NextResponse<GithubContributionApiResult>> {
  try {
    const repos: GithubRepo[] = await axios.get(`${GITHUB_API_URL}/orgs/${ORGANIZATION}/repos`, {headers})
      .then(res => res.data);
    const members: GithubMember[] = await axios.get(`${GITHUB_API_URL}/orgs/${ORGANIZATION}/members`, {headers})
      .then(res => res.data);

    const memberLogins = new Set(members.map(member => member.login));
    const contributions: Contribution = {};

    await Promise.all(repos.map(async repo => {
      const contributors = await axios.get(`${GITHUB_API_URL}/repos/${repo.full_name}/contributors`, {headers})
        .then(res => res.data);

      const stats = await getContributorStats(repo.full_name);

      if (!Array.isArray(stats)) {
        console.error(`Unexpected stats format for ${repo.full_name}:`, stats);
        return;
      }

      for (const contributor of contributors) {
        if (memberLogins.has(contributor.login)) {
          if (!contributions[contributor.login]) {
            contributions[contributor.login] = {commits: 0, additions: 0, deletions: 0};
          }
          contributions[contributor.login].commits += contributor.contributions;

          const contributorStats = stats.find(stat => stat.author.login === contributor.login);
          if (contributorStats) {
            contributorStats.weeks.forEach((week: { a: number, d: number }) => {
              contributions[contributor.login].additions += week.a;
              contributions[contributor.login].deletions += week.d;
            });
          } else {
            console.warn(`No stats found for contributor ${contributor.login} in ${repo.full_name}`);
          }
        }
      }
    }))

    const result = Object.entries(contributions).map(([login, stats]) => ({id: login, ...stats}));

    return NextResponse.json({
      data: result,
      error: '',
      status: 0
    });
  } catch (e) {
    return NextResponse.json({
      data: [],
      error: JSON.stringify(e),
      status: -1
    });
  }
}