import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  //const { slug } = await params;

  console.log('slug is', slug);
  try {
    const { default: Post } = await import(
      `@/components/learn/mdx-contents/${slug}.mdx`
    );
    return <div className="px-3">{<Post />}</div>;
  } catch (error) {
    console.error('Failed to load MDX:', error);
    notFound(); // triggers the 404 page
  }
}

export async function generateStaticParams() {
  return [
    { slug: 'what-is-goat' },
    { slug: 'about' },
    { slug: 'tournaments' },
    { slug: 'pvp' },
    // Add more slugs here as you go
  ];
}

export const dynamicParams = false;
