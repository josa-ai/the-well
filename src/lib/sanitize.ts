import sanitizeHtml from "sanitize-html";

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "p", "br", "strong", "em", "u",
    "a", "ul", "ol", "li", "blockquote",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    }),
  },
};

export function sanitizeEventHtml(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}
