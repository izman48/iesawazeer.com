import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <p className="muted">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <MDXRemote source={post.content} />
    </article>
  );
}
