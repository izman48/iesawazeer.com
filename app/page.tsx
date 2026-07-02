import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getProjects } from '@/lib/github';
import { FEATURED_PROJECTS, UNI_PROJECTS } from '@/data/projects';
import type { ProjectInfo } from '@/lib/github';

function ProjectList({ projects }: { projects: ProjectInfo[] }) {
  return (
    <div>
      {projects.map((p) => (
        <div className="project" key={p.name}>
          <div className="title-row">
            {p.url ? <a href={p.url}>{p.name}</a> : <strong>{p.name}</strong>}
            {p.meta && <span className="meta">{p.meta}</span>}
          </div>
          {p.description && <p>{p.description}</p>}
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const posts = getAllPosts().slice(0, 5);
  const [featured, uni] = await Promise.all([
    getProjects(FEATURED_PROJECTS),
    getProjects(UNI_PROJECTS),
  ]);

  return (
    <>
      <h1>Hi, I&apos;m Iesa 👋</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/iesa.jpg"
        alt="Iesa on the Brooklyn Bridge, Manhattan skyline behind"
        className="portrait"
      />
      <p>
        London-based engineer. I enjoy building cool stuff, and I&apos;m
        founding nilu inc — right now that means{' '}
        <a href="https://finance.nilu.app">finance.nilu.app</a>.
      </p>
      <p>
        More about me and my history on the <Link href="/about/">about page</Link>,
        and if we&apos;re collaborating, read{' '}
        <Link href="/working-with-me/">how to work with me</Link>.
      </p>

      <h2>Projects</h2>
      <p className="muted">
        A few things I&apos;ve built —{' '}
        <a href="https://github.com/izman48">more on GitHub</a>.
      </p>
      <ProjectList projects={featured} />

      <h2>From my university days</h2>
      <p className="muted">
        Older work from studying Computer Science at Warwick — kept around
        because I&apos;m fond of it.
      </p>
      <ProjectList projects={uni} />

      <h2>Writing</h2>
      {posts.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
              <time dateTime={post.date}>{post.date}</time>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
