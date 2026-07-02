import { FEATURED_PROJECTS, GITHUB_USER } from '@/data/projects';

export interface ProjectInfo {
  name: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
}

// Fetched at build time (static export), so this never runs in the browser.
// If the GitHub API is unavailable the site still builds with the local blurbs.
export async function getFeaturedProjects(): Promise<ProjectInfo[]> {
  return Promise.all(
    FEATURED_PROJECTS.map(async ({ repo, blurb }) => {
      const fallback: ProjectInfo = {
        name: repo,
        url: `https://github.com/${GITHUB_USER}/${repo}`,
        description: blurb ?? '',
        language: null,
        stars: 0,
      };
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo}`,
          { headers: { Accept: 'application/vnd.github+json' } },
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
