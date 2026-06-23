import axios from "axios";
import {NextResponse} from "next/server";

const GITHUB_API_URL = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const ORGANIZATION = process.env.ORGANIZATION;
const TEAM = process.env.GITHUB_TEAM;

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const REQUEST_TIMEOUT_MS = 8000;

const emptyResponse = {
  summary: [] as DeveloperInfo[],
  details: [] as RepoContributor[],
  success: false,
};

interface GithubUser {
  login: string;
  url: string;
  html_url: string;
  avatar_url: string;
}

interface GithubRepo {
  name: string;
  full_name: string;
  url: string;
}

interface GithubContributor {
  total: number;
  weeks: { w: number, a: number, d: number, c: number }[];
  author: {
    login: string;
  }
}

export interface DeveloperInfo {
  username: string;
  displayName: string;
  user_page: string;
  avatar: string;
  contributions: DeveloperContribute;
}

export interface Contribution {
  commits: number;
  additions: number;
  deletions: number;
}

export interface DeveloperContribute {
  commits: number;
  additions: number;
  deletions: number;
  username: string;
}

export interface RepoContributor {
  repo: string;
  contributors: DeveloperContribute[];
}

export interface GetDevelopersResponse {
  summary: DeveloperInfo[];
  details: RepoContributor[];
  success: boolean;
}

const getName = async (user: GithubUser | undefined) => {
  if (!user) return '';
  const resp = await axios.get(user.url, {headers, timeout: REQUEST_TIMEOUT_MS});
  return resp.data.name || user.login;
}

export async function GET(): Promise<NextResponse<GetDevelopersResponse>> {
  if (!TOKEN || !ORGANIZATION || !TEAM) {
    return NextResponse.json(emptyResponse);
  }

  try {
    const [members, repositories] = await Promise.all([
      axios.get<GithubUser[]>(
        `${GITHUB_API_URL}/orgs/${ORGANIZATION}/teams/${TEAM}/members`,
        {headers, timeout: REQUEST_TIMEOUT_MS}
      ).then(resp => resp.data),
      axios.get<GithubRepo[]>(
        `${GITHUB_API_URL}/orgs/${ORGANIZATION}/repos`,
        {headers, timeout: REQUEST_TIMEOUT_MS}
      ).then(resp => resp.data)
    ]);

    const memberUsernames = new Set(members.map(member => member.login));

    const summary: DeveloperInfo[] = await Promise.all(members.map(async (member) => {
      return {
        username: member.login,
        displayName: await getName(member),
        user_page: member.html_url,
        avatar: member.avatar_url,
        contributions: {
          commits: 0,
          additions: 0,
          deletions: 0
        }
      } as DeveloperInfo;
    }))

    const details: RepoContributor[] = await Promise.all(repositories.map(async ({url, full_name}) => {
      const repoContributors: GithubContributor[] = await axios.get(`${url}/stats/contributors`, {
        headers,
        timeout: REQUEST_TIMEOUT_MS
      })
        .then(resp => {
          const data = resp.data as GithubContributor[];
          if (!Array.isArray(data)) {
            console.error(`Unexpected stats format for ${full_name}, ${resp.status} [${url}/stats/contributors]:`, data);
            return [];
          }
          return data;
        })
        .catch(error => {
          console.log(url, 'Contributors Error:', error);
          return [];
        });

      return {
        repo: full_name,
        contributors: await Promise.all(repoContributors
          .filter(contributor => memberUsernames.has(contributor.author.login))
          .map(async (contributor): Promise<DeveloperContribute> => ({
            commits: contributor.total,
            additions: contributor.weeks.reduce((acc, week) => acc + week.a, 0),
            deletions: contributor.weeks.reduce((acc, week) => acc + week.d, 0),
            username: contributor.author.login,
          })))
      };
    }));

    details.forEach(detail => {
      detail.contributors.forEach(contributor => {
        const member = summary.find(member => member.username === contributor.username);
        if (member) {
          member.contributions.commits += contributor.commits;
          member.contributions.additions += contributor.additions;
          member.contributions.deletions += contributor.deletions;
        }
      });
    })

    return NextResponse.json({summary, details, success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json(emptyResponse);
  }
}
