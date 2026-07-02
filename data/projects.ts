// Projects featured on the homepage.
// Entries with `repo` link to github.com/izman48/<repo> and get description/
// language/stars from the GitHub API at build time (`blurb` overrides the
// wording). Entries without `repo` are rendered as-is — projects that never
// made it to GitHub but are still worth talking about.

export interface FeaturedProject {
  repo?: string; // name under github.com/izman48
  title?: string; // required when there's no repo
  blurb?: string;
  url?: string; // external link for non-repo entries
  tags?: string[]; // shown in place of language/stars for non-repo entries
}

export const GITHUB_USER = 'izman48';

export const FEATURED_PROJECTS: FeaturedProject[] = [
  { repo: 'llm-control-plane' },
  { repo: 'llm-rl-playground' },
  { repo: 'finance-tracker' },
  {
    title: 'jnwrentacar.com',
    url: 'https://jnwrentacar.com/',
    tags: ['TypeScript', 'Live site'],
    blurb:
      'The site for JNW Lanka Tours — car rentals, airport transfers, and tour experiences across Sri Lanka.',
  },
];

// Older projects from my university days (and just before/after).
export const UNI_PROJECTS: FeaturedProject[] = [
  {
    repo: '2d-fighting-game-rl-ai-training-tool-dissertation',
    blurb:
      'Final-year project: an RL agent (Unity ML-Agents + PyTorch) that learns a custom 2D fighting game inspired by Smash Bros, with training checkpoints saved as difficulty "levels". Received a 1st.',
  },
  {
    repo: 'TourneyBot',
    blurb:
      'One of three Discord bots (Shepard, Dude, and MarianBot — the first two named after Rocket League\'s AI bots) I built for the 200+ member Warwick Rocket League server: tournaments, auto-created voice channels. Earned me the Contributor role.',
  },
  {
    repo: 'Tetris',
    blurb:
      'Tetris from scratch in C++ and OpenGL over a weekend for Computer Graphics — wall kicks, hold piece, scoring with difficulties — then shaders for a pseudo-3D look.',
  },
  {
    repo: 'Traffic-roundabout-visualisation',
    blurb:
      'First-year visualisation: autonomous agents + steering forces simulating traffic around a roundabout. Learned it all from The Coding Train — massive shoutout.',
  },
  {
    repo: 'JS-Challenge',
    blurb:
      'Data-visualisation challenge: charts, filtering, a pinned map, Vuex, and Jest tests.',
  },
  {
    title: 'iesawazeer.com',
    url: 'https://github.com/izman48/iesawazeer.com/tree/vue-legacy',
    tags: ['Vue', 'Firebase'],
    blurb:
      'The previous version of this site (Vue + Firebase) — built in two weeks while locked up in a quarantine camp in 2020, determined to leave with something to show for it.',
  },
  {
    title: 'The Warwick Esports website',
    url: 'https://warwickesports.com/',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    blurb:
      'As Technical Secretary of Warwick Esports I led coders and non-coders rebuilding the society site, adding a Firebase-backed news section used for weekly releases and announcing the HyperX partnership.',
  },
  {
    title: 'Verticality — NSE Game Jam 2021',
    tags: ['Unity', 'C#', 'Game Jam'],
    blurb:
      'Gathered a team of five for the NSE × Barclays game jam and prototyped a first-person parkour battle royale inspired by Mirror\'s Edge, Mario Kart, and Portal.',
  },
  {
    title: 'Derivative trade system for Deutsche Bank',
    tags: ['Django', 'Python', 'MongoDB', 'React'],
    blurb:
      'Group project presented to Deutsche Bank: a derivative-trade system with a learning component flagging incorrect trades. I co-built the backend and led the testing plan.',
  },
  {
    title: 'Image preprocessing with OpenCV',
    tags: ['Python', 'OpenCV', 'Tesseract'],
    blurb:
      'Summer internship project preparing documents for OCR text extraction — finished two weeks early, so extended it to handle documents from dot-matrix printers.',
  },
  {
    title: 'Iris dataset classification',
    tags: ['Python', 'ML', 'Jupyter'],
    blurb:
      'Supervised learning on the classic Iris dataset: PCA, multi-class perceptrons, and RBF-kernel projections to find where the data becomes linearly separable.',
  },
  {
    title: 'Pathfinding robot in a maze',
    tags: ['Java'],
    blurb:
      'My very first uni project: guiding a robot out of mazes (loops included) with pathfinding algorithms like A*.',
  },
];
