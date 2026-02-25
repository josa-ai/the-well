// JSON-LD structured data component for SEO
// Data is always generated server-side from our own schema generators (src/lib/schema.ts)
// and never contains user-supplied content, so dangerouslySetInnerHTML is safe here.

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
