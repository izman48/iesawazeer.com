// The projects featured on the homepage. Add or remove a repo name here and
// rebuild — description/language/stars come from the GitHub API at build time.
// `blurb` overrides the GitHub description when you want different wording.

export interface FeaturedProject {
  repo: string; // name under github.com/izman48
  blurb?: string;
}

export const GITHUB_USER = 'izman48';

export const FEATURED_PROJECTS: FeaturedProject[] = [
  { repo: 'llm-control-plane' },
  { repo: 'llm-rl-playground' },
  { repo: 'finance-tracker' },
  {
    repo: '2d-fighting-game-rl-ai-training-tool-dissertation',
    blurb:
      'University dissertation: trained an RL agent to play a 2D fighting game I built from scratch.',
  },
];
