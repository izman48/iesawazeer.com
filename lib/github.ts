import { GITHUB_USER, type FeaturedProject } from '@/data/projects';

export interface ProjectInfo {
  name: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
}

// Fetched at build time (static export), so this never runs in the browser.
// If the GitHub API is unavailable the site still builds with the local blurbs.
export async function getProjects(
  list: FeaturedProject[],
): Promise<ProjectInfo[]> {
  return Promise.all(
    list.map(async ({ repo, blurb }) => {
      const fallback: ProjectInfo = {
        name: repo,
        url: `https://github.com/${GITHUB_USER}/${repo}`,
        description: blurb ?? '',
        language: null,
        stars: 0,
      };
      try {
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github+json',
        };
        // Optional: avoids unauthenticated rate limits during builds.
        if (process.env.GITHUB_TOKEN) {
          headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo}`,
          { headers },
        );
        if (!res.ok) return fallback;
        const data = await res.json();
        return {
          name: data.name,
          url: data.html_url,
          description: blurb ?? data.description ?? '',
          language: data.language,
          stars: data.stargazers_count,
        };
      } catch {
        return fallback;
      }
    }),
  );
}
