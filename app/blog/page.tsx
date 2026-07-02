import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <>
      <h1>Blog</h1>
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
