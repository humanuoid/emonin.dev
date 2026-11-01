import { getEntry } from 'astro:content';

// Inline technical terms in content strings use the syntax [[term]] (hint from
// the glossary) or [[term|custom hint]] (override). withTerms() HTML-escapes the
// text first, then turns each marker into a dotted-underline span carrying the
// tooltip hint (see src/styles/components/ui/tooltip.css). A term missing from
// the glossary renders as plain text. Usage: <p set:html={withTerms(text, glossary)} />
// Glossary keys are normalized: lowercase, whitespace removed — so "RBAC / ABAC"
// and "RBAC/ABAC" are the same term.
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '');

export async function getGlossary(): Promise<Map<string, string>> {
  const entry = await getEntry('site', 'glossary');
  if (!entry || entry.data.kind !== 'glossary') return new Map();
  return new Map(entry.data.terms.map((t) => [normalize(t.term), t.hint]));
}

export function withTerms(text: string, glossary?: Map<string, string>): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(
    /\[\[([^\][|]+)(?:\|([^\][]+))?\]\]/g,
    (_match, rawTerm: string, override: string | undefined) => {
      const term = rawTerm.trim();
      const hint = override?.trim() || glossary?.get(normalize(term));
      if (!hint) return term;
      return `<span class="term" tabindex="0" data-hint="${hint}">${term}</span>`;
    },
  );
}

// Tooltip hint for a tech tag (skill item, project tag), from the glossary
export function hintFor(label: string, glossary?: Map<string, string>): string | undefined {
  return glossary?.get(normalize(label));
}
