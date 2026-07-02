import { GITHUB_USER, type FeaturedProject } from '@/data/projects';

export interface ProjectInfo {
  name: string;
  url: string | null;
  description: string;
  meta: string; // "Python · ★ 3" for repos, "Unity, C#, Game Jam" for the rest
}

// Fetched at build time (static export), so this never runs in the browser.
// If the GitHub API is unavailable the site still builds with the local blurbs.
export async function getProjects(
  list: FeaturedProject[],
): Promise<ProjectInfo[]> {
  return Promise.all(
    list.map(async ({ repo, title, blurb, url, tags }) => {
      if (!repo) {
        return {
          name: title ?? '',
          url: url ?? null,
          description: blurb ?? '',
          meta: tags?.join(', ') ?? '',
        };
      }
      const fallback: ProjectInfo = {
        name: repo,
        url: `https://github.com/${GITHUB_USER}/${repo}`,
        description: blurb ?? '',
        meta: '',
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
        const meta = [
          data.language,
          data.stargazers_count > 0 ? `★ ${data.stargazers_count}` : null,
        ]
          .filter(Boolean)
          .join(' · ');
        return {
          name: data.name,
          url: data.html_url,
          description: blurb ?? data.description ?? '',
          meta,
        };
      } catch {
        return fallback;
      }
    }),
  );
}
