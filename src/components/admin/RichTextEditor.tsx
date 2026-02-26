"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write event description..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  function addLink() {
    if (!editor) return;
    const url = window.prompt("Enter URL:");
    if (!url) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  const btnBase =
    "p-1.5 rounded text-[var(--color-text-muted)] hover:bg-white hover:text-[var(--color-text)] transition-colors";
  const btnActive = "bg-white text-[var(--color-primary)] shadow-sm";

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-[var(--color-border)] bg-[var(--color-background)] px-2 py-1.5 flex-wrap">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnBase} ${editor.isActive("bold") ? btnActive : ""}`}
          title="Bold"
        >
          <span className="text-xs font-bold">B</span>
        </button>
        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${editor.isActive("italic") ? btnActive : ""}`}
          title="Italic"
        >
          <span className="text-xs italic">I</span>
        </button>
        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${editor.isActive("underline") ? btnActive : ""}`}
          title="Underline"
        >
          <span className="text-xs underline">U</span>
        </button>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

        {/* H2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnBase} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}
          title="Heading 2"
        >
          <span className="text-xs font-bold">H2</span>
        </button>
        {/* H3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btnBase} ${editor.isActive("heading", { level: 3 }) ? btnActive : ""}`}
          title="Heading 3"
        >
          <span className="text-xs font-bold">H3</span>
        </button>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${editor.isActive("bulletList") ? btnActive : ""}`}
          title="Bullet List"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </button>
        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${editor.isActive("orderedList") ? btnActive : ""}`}
          title="Numbered List"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75V5.25m0 1.5h1.5m-1.5 0l1.125 1.5M3.75 12V10.5m0 1.5h1.5m-1.5 0l1.125 1.5M3.75 17.25V15.75m0 1.5h1.5m-1.5 0l1.125 1.5" />
          </svg>
        </button>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={addLink}
          className={`${btnBase} ${editor.isActive("link") ? btnActive : ""}`}
          title="Link"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-1.061a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.07" />
          </svg>
        </button>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

        {/* Align Left */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${btnBase} ${editor.isActive({ textAlign: "left" }) ? btnActive : ""}`}
          title="Align Left"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h10.5M3.75 17.25h16.5" />
          </svg>
        </button>
        {/* Align Center */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${btnBase} ${editor.isActive({ textAlign: "center" }) ? btnActive : ""}`}
          title="Align Center"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M6.75 12h10.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-3 min-h-[300px] text-[var(--color-text)] bg-white focus-within:outline-none [&_.tiptap]:outline-none [&_.tiptap]:min-h-[280px] [&_.tiptap_p.is-editor-empty:first-child::before]:text-[var(--color-text-muted)] [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}
