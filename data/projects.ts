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
];

// Older projects from my university days.
export const UNI_PROJECTS: FeaturedProject[] = [
  {
    repo: '2d-fighting-game-rl-ai-training-tool-dissertation',
    blurb:
      'Dissertation: trained an RL agent to play a 2D fighting game I built from scratch.',
  },
  {
    repo: 'TourneyBot',
    blurb:
      'Discord bot for running in-house Rocket League tournaments — built for my uni team days.',
  },
  { repo: 'Tetris' },
  {
    repo: 'Traffic-roundabout-visualisation',
    blurb:
      'Autonomous agents + steering forces visualising traffic around a roundabout.',
  },
  { repo: 'Unity-Project', blurb: 'Final year Unity game project.' },
  {
    repo: 'JS-Challenge',
    blurb:
      'Data-visualisation challenge: charts, filtering, a pinned map, Vuex, and Jest tests.',
  },
];
