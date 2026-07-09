import type { ContentBlock } from '@/data/contentTypes';

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-nexus space-y-4 text-[15px] leading-relaxed text-ink-2">
      {blocks.map((block, i) => {
        if (block.type === 'p') return <p key={i}>{block.text}</p>;
        if (block.type === 'h2') return <h2 key={i} className="mt-8 text-xl font-bold text-ink">{block.text}</h2>;
        if (block.type === 'h3') return <h3 key={i} className="mt-6 text-lg font-semibold text-ink">{block.text}</h3>;
        if (block.type === 'ul')
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        return null;
      })}
    </div>
  );
}
