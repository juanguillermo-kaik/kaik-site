"use client";

import { useEffect, useRef } from "react";

type Inline = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; href?: string };
type Block = { type: "paragraph" | "heading" | "quote" | "bullet-list" | "ordered-list"; level?: 2 | 3; content: Inline[] | Inline[][] };
type RichDocument = { version: 1; blocks: Block[] };

function isSafeUrl(value: string | null) {
  if (!value) return undefined;
  try { const url = new URL(value, window.location.origin); return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}

function inlineContent(element: Element): Inline[] {
  const output: Inline[] = [];
  const walk = (node: Node, marks: Omit<Inline, "text"> = {}) => {
    if (node.nodeType === Node.TEXT_NODE) { if (node.textContent) output.push({ text: node.textContent, ...marks }); return; }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const item = node as Element;
    const tag = item.tagName.toLowerCase();
    const next = { ...marks, ...(tag === "strong" || tag === "b" ? { bold: true } : {}), ...(tag === "em" || tag === "i" ? { italic: true } : {}), ...(tag === "u" ? { underline: true } : {}), ...(tag === "a" ? { href: isSafeUrl(item.getAttribute("href")) } : {}) };
    if (tag === "br") { output.push({ text: "\n", ...marks }); return; }
    item.childNodes.forEach((child) => walk(child, next));
  };
  element.childNodes.forEach((child) => walk(child));
  return output.length ? output : [{ text: "" }];
}

function toDocument(html: string): RichDocument {
  const root = new DOMParser().parseFromString(html, "text/html").body;
  const blocks: Block[] = [];
  root.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) blocks.push({ type: "paragraph", content: [{ text: node.textContent }] });
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node as Element; const tag = element.tagName.toLowerCase();
    if (tag === "ul" || tag === "ol") blocks.push({ type: tag === "ul" ? "bullet-list" : "ordered-list", content: Array.from(element.querySelectorAll(":scope > li")).map((item) => inlineContent(item)) });
    else if (tag === "h2" || tag === "h3") blocks.push({ type: "heading", level: tag === "h3" ? 3 : 2, content: inlineContent(element) });
    else if (tag === "blockquote") blocks.push({ type: "quote", content: inlineContent(element) });
    else blocks.push({ type: "paragraph", content: inlineContent(element) });
  });
  return { version: 1, blocks: blocks.length ? blocks : [{ type: "paragraph", content: [{ text: "" }] }] };
}

function inlineHtml(content: Inline[]) { return content.map((item) => { let value = item.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>"); if (item.bold) value = `<strong>${value}</strong>`; if (item.italic) value = `<em>${value}</em>`; if (item.underline) value = `<u>${value}</u>`; if (item.href) value = `<a href="${item.href}">${value}</a>`; return value; }).join(""); }
function toHtml(value: string) {
  try {
    const document = JSON.parse(value) as RichDocument;
    if (document.version !== 1 || !Array.isArray(document.blocks)) throw new Error();
    return document.blocks.map((block) => { if (block.type === "bullet-list" || block.type === "ordered-list") { const tag = block.type === "ordered-list" ? "ol" : "ul"; return `<${tag}>${(block.content as Inline[][]).map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</${tag}>`; } if (block.type === "heading") return `<h${block.level === 3 ? 3 : 2}>${inlineHtml(block.content as Inline[])}</h${block.level === 3 ? 3 : 2}>`; if (block.type === "quote") return `<blockquote>${inlineHtml(block.content as Inline[])}</blockquote>`; return `<p>${inlineHtml(block.content as Inline[])}</p>`; }).join("");
  } catch { return value.split(/\n\s*\n/).filter(Boolean).map((paragraph) => `<p>${paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`).join(""); }
}

export function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);
  useEffect(() => { if (editor.current && editor.current.dataset.value !== value) { editor.current.innerHTML = toHtml(value); editor.current.dataset.value = value; } }, [value]);
  const sync = () => { if (!editor.current) return; const next = JSON.stringify(toDocument(editor.current.innerHTML)); editor.current.dataset.value = next; onChange(next); };
  const command = (name: string, argument?: string) => { editor.current?.focus(); document.execCommand(name, false, argument); sync(); };
  const addLink = () => { const url = window.prompt("Pega la URL del enlace"); if (url && isSafeUrl(url)) command("createLink", url); };
  return <div className="mt-2 overflow-hidden rounded-xl border border-[#dbe2ec] bg-white focus-within:border-[#1371fa]">
    <div className="flex flex-wrap gap-1 border-b border-[#e7ebf1] bg-[#f7f9fc] p-2">
      <ToolbarButton label="Negrita" onClick={() => command("bold")}>B</ToolbarButton><ToolbarButton label="Cursiva" onClick={() => command("italic")}><em>I</em></ToolbarButton><ToolbarButton label="Subrayado" onClick={() => command("underline")}><u>U</u></ToolbarButton><ToolbarButton label="Título" onClick={() => command("formatBlock", "h2")}>H2</ToolbarButton><ToolbarButton label="Lista" onClick={() => command("insertUnorderedList")}>• Lista</ToolbarButton><ToolbarButton label="Cita" onClick={() => command("formatBlock", "blockquote")}>❝</ToolbarButton><ToolbarButton label="Agregar enlace" onClick={addLink}>↗ Enlace</ToolbarButton>
    </div>
    <div ref={editor} contentEditable role="textbox" aria-multiline="true" onInput={sync} className="min-h-72 px-4 py-3 text-base leading-7 text-[#414855] outline-none [&_blockquote]:border-l-4 [&_blockquote]:border-[#0037ff] [&_blockquote]:pl-4 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6" />
    <p className="border-t border-[#edf0f4] px-4 py-2 text-xs text-[#8b94a4]">Puedes escribir emojis directamente desde tu teclado.</p>
  </div>;
}

function ToolbarButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) { return <button type="button" aria-label={label} title={label} onMouseDown={(event) => event.preventDefault()} onClick={onClick} className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#4f5868] transition hover:bg-white hover:text-[#0037ff]">{children}</button>; }
