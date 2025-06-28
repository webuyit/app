import React, { ComponentPropsWithoutRef } from 'react';

import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <div className="my-4 w-full rounded-xl bg-lime-300 p-3">
      <h1 className="mb-0 font-medium" {...props} />
    </div>
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="mb-3 mt-6 font-semibold text-gray-800 dark:text-zinc-200"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mb-1 mt-3 text-gray-800 dark:text-zinc-200" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p
      className="mb-2 leading-snug text-gray-800 dark:text-zinc-300"
      {...props}
    />
  ),
  img: (props: ImageProps) => (
    <Image
      width={1000}
      height={500}
      className="my-4 rounded-lg"
      {...(props as ImageProps)}
      alt="Image-overview"
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-1 pl-5 text-gray-800 dark:text-zinc-300"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="my-4 list-disc space-y-1 rounded-md bg-green-100 p-2.5 pl-5 text-gray-800 dark:text-zinc-300"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="mb-0 text-sm" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-3 ml-[0.075em] border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
