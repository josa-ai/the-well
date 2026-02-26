"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  function insertMarkdown(prefix: string, suffix: string = "") {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const newText =
      value.slice(0, start) + prefix + selected + suffix + value.slice(end);
    onChange(newText);

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    });
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => insertMarkdown("**", "**")}
            className="p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors"
            title="Bold"
          >
            <span className="text-xs font-bold">B</span>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("*", "*")}
            className="p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors"
            title="Italic"
          >
            <span className="text-xs italic">I</span>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("## ")}
            className="p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors"
            title="Heading"
          >
            <span className="text-xs font-bold">H</span>
          </button>
          <div className="w-px h-4 bg-[var(--color-border)] mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("- ")}
            className="p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors"
            title="List"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("[", "](url)")}
            className="p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors"
            title="Link"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-1.061a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.07" />
            </svg>
          </button>
        </div>

        <div className="flex bg-white rounded-md border border-[var(--color-border-light)] overflow-hidden">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              tab === "write"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              tab === "preview"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {tab === "write" ? (
        <textarea
          id="markdown-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 text-sm font-mono text-[var(--color-text)] bg-white resize-y focus:outline-none"
          placeholder="Write event details in Markdown..."
        />
      ) : (
        <div className="px-4 py-3 min-h-[300px] prose prose-sm max-w-none text-[var(--color-text)]">
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-[var(--color-text-muted)] italic">
              Nothing to preview
            </p>
          )}
        </div>
      )}
    </div>
  );
}
