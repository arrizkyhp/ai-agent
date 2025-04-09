import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="mt-8 mb-4 text-4xl font-extrabold tracking-tight text-gray-900"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mt-8 mb-4 text-3xl font-bold tracking-tight text-gray-900" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-gray-900"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="mt-6 mb-3 text-xl font-semibold tracking-tight text-gray-900"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-800" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc mb-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal mb-4 space-y-2" {...props} />,
          li({ node, children, ...props }) {
            const isOnlyParagraph =
              Array.isArray(children) && children.length === 1 && children[0]?.type === 'p';

            return (
              <li
                className={`leading-relaxed text-gray-800 ${isOnlyParagraph ? 'hide-marker' : ''}`}
                {...props}
              >
                {children}
              </li>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-8 border-gray-300" {...props} />,
          table: ({ node, ...props }) => (
            <table className="min-w-full border border-gray-300 mb-4" {...props} />
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => <tr className="border-b border-gray-300" {...props} />,
          th: ({ node, ...props }) => (
            <th className="text-left font-semibold p-2 border border-gray-300" {...props} />
          ),
          td: ({ node, ...props }) => <td className="p-2 border border-gray-300" {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic text-gray-800" {...props} />,
          del: ({ node, ...props }) => <del className="line-through text-gray-500" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.content === nextProps.content;
  },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock
      content={block}
      key={`${id}-block_${
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        index
      }`}
    />
  ));
});

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
