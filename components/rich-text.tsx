import { Fragment } from "react";

type Inline = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; href?: string };
type Block = { type: "paragraph" | "heading" | "quote" | "bullet-list" | "ordered-list"; level?: 2 | 3; content: Inline[] | Inline[][] };
type RichDocument = { version: 1; blocks: Block[] };

function parseDocument(value: string): RichDocument | null {
  try {
    const parsed = JSON.parse(value) as RichDocument;
    return parsed?.version === 1 && Array.isArray(parsed.blocks) ? parsed : null;
  } catch { return null; }
}

function InlineContent({ content }: { content: Inline[] }) {
  return <>{content.map((item, index) => {
    let node: React.ReactNode = item.text;
    if (item.bold) node = <strong>{node}</strong>;
    if (item.italic) node = <em>{node}</em>;
    if (item.underline) node = <u>{node}</u>;
    if (item.href) node = <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0037ff] underline decoration-[#8eb0ff] underline-offset-4">{node}</a>;
    return <Fragment key={index}>{node}</Fragment>;
  })}</>;
}

export function RichText({ content }: { content: string }) {
  const document = parseDocument(content);
  if (!document) return <>{content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>;
  return <>{document.blocks.map((block, index) => {
    if (block.type === "heading") {
      const Tag = block.level === 3 ? "h3" : "h2";
      return <Tag key={index} className="font-semibold leading-tight text-[#20222d]"><InlineContent content={block.content as Inline[]} /></Tag>;
    }
    if (block.type === "quote") return <blockquote key={index} className="border-l-4 border-[#0037ff] pl-5 text-xl font-medium leading-8 text-[#4e5a71]"><InlineContent content={block.content as Inline[]} /></blockquote>;
    if (block.type === "bullet-list" || block.type === "ordered-list") {
      const List = block.type === "ordered-list" ? "ol" : "ul";
      return <List key={index} className={`space-y-2 pl-6 ${block.type === "ordered-list" ? "list-decimal" : "list-disc"}`}>{(block.content as Inline[][]).map((item, itemIndex) => <li key={itemIndex}><InlineContent content={item} /></li>)}</List>;
    }
    return <p key={index}><InlineContent content={block.content as Inline[]} /></p>;
  })}</>;
}
