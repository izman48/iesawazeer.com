import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getFeaturedProjects } from '@/lib/github';

export default async function Home() {
  const posts = getAllPosts().slice(0, 5);
  const projects = await getFeaturedProjects();

  return (
    <>
      <h1>Hi, I&apos;m Iesa 👋</h1>
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
      <div>
        {projects.map((p) => (
          <div className="project" key={p.name}>
            <div className="title-row">
              <a href={p.url}>{p.name}</a>
              <span className="meta">
                {p.language}
                {p.stars > 0 ? ` · ★ ${p.stars}` : ''}
              </span>
            </div>
            {p.description && <p>{p.description}</p>}
          </div>
        ))}
      </div>

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
