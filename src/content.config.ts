import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Icon names usable in content — each must exist in src/components/ui/icon.astro
const ctaIcons = ['download', 'mail', 'arrow-right', 'file-text'] as const;
const sectionIcons = ['layers', 'briefcase', 'folder', 'heart', 'braces'] as const;
const highlightIcons = ['layers', 'database', 'shield-check'] as const;
const badgeIcons = [
  'target',
  'lightbulb',
  'users',
  'zap',
  'footprints',
  'mountain',
  'trees',
  'gamepad-2',
  'utensils-crossed',
] as const;
const skillGroupIcons = [
  'layers',
  'database',
  'zap',
  'shield-check',
  'users',
  'code',
  'monitor',
  'flask-conical',
  'sparkles',
  'server',
] as const;
const titleIcons = ['user', 'compass', 'mail'] as const;

const ctaSchema = z.object({
  href: z.string(),
  label: z.string(),
  icon: z.enum(ctaIcons),
  // modal set = the CTA opens an in-page modal (used for the CV PDF lite preview)
  modal: z
    .object({
      openLabel: z.string(),
      loadingLabel: z.string(),
    })
    .optional(),
});

// Site singletons: one Markdown file per entry in src/content/site/.
// The `kind` field picks the schema. `profile` is strict on purpose:
// it has no email field, so an address can never be added without failing the build.
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.discriminatedUnion('kind', [
    z
      .object({
        kind: z.literal('profile'),
        name: z.string(),
        headline: z.string(),
        baseline: z.string(),
        location: z.string(),
        brand: z.object({ name: z.string(), domain: z.string() }),
        credit: z.object({ text: z.string(), linkLabel: z.string(), href: z.string() }),
        nav: z.array(z.object({ href: z.string(), label: z.string() })),
        socials: z.array(
          z.object({
            href: z.string(),
            label: z.string(),
            icon: z.enum(['github', 'linkedin']),
          }),
        ),
        cv: z.object({ href: z.string(), label: z.string() }),
        // Floating availability badge: status drives the dot color
        // (available = green, training = amber), label/period are the text
        availability: z.object({
          status: z.enum(['available', 'training']),
          label: z.string(),
          period: z.string().optional(),
        }),
      })
      .strict(),
    z
      .object({
        kind: z.literal('home'),
        hero: z.object({
          icon: z.enum(titleIcons).optional(),
          eyebrow: z.string(),
          title: z.string(),
          subtitle: z.string(),
          location: z.string(),
          primaryCta: ctaSchema,
          secondaryCta: ctaSchema,
        }),
        preview: z.object({
          title: z.string().optional(),
          highlights: z.array(
            z.object({
              icon: z.enum(highlightIcons),
              title: z.string(),
              text: z.string(),
              meta: z.string().optional(),
              link: z.object({ href: z.string(), label: z.string() }).optional(),
            }),
          ),
          cta: ctaSchema,
        }),
        // Optional callout rendered under the preview cards on the home page
        callout: z
          .object({
            title: z.string(),
            text: z.string(),
            variant: z.enum(['accent', 'warning']).optional(),
            sourcesLabel: z.string().optional(),
            sources: z.array(z.object({ href: z.string(), label: z.string() })).optional(),
          })
          .optional(),
      })
      .strict(),
    z
      .object({
        kind: z.literal('parcours'),
        icon: z.enum(titleIcons).optional(),
        title: z.string(),
        intro: z.string(),
        titles: z.object({
          skills: z.string(),
          experience: z.string(),
          education: z.string(),
          projects: z.string(),
          values: z.string(),
        }),
        sectionIcons: z.object({
          skills: z.enum(sectionIcons),
          experience: z.enum(sectionIcons),
          projects: z.enum(sectionIcons),
          values: z.enum(sectionIcons),
        }),
        projectLinkLabels: z.object({ demo: z.string(), code: z.string() }),
        values: z.object({
          label: z.string(),
          items: z.array(z.object({ label: z.string(), icon: z.enum(badgeIcons) })),
        }),
        hobbies: z.object({
          label: z.string(),
          items: z.array(z.object({ label: z.string(), icon: z.enum(badgeIcons) })),
        }),
      })
      .strict(),
    z
      .object({
        kind: z.literal('contact'),
        icon: z.enum(titleIcons).optional(),
        title: z.string(),
        intro: z.string(),
        successMessage: z.string(),
        form: z.object({
          nameLabel: z.string(),
          emailLabel: z.string(),
          messageLabel: z.string(),
          submitLabel: z.string(),
          notice: z.string(),
        }),
      })
      .strict(),
    // Glossary: ONE definition per technical term, reused by every tooltip
    // (inline [[term]] markers and tech tags both look hints up here).
    z
      .object({
        kind: z.literal('glossary'),
        terms: z.array(z.object({ term: z.string(), hint: z.string() })),
      })
      .strict(),
  ]),
});

// Skills: one typed Markdown entry per skill group in src/content/skills/.
// items are plain labels — their tooltip hints come from the glossary.
const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    icon: z.enum(skillGroupIcons),
    title: z.string(),
    description: z.string(),
    items: z.array(z.string()),
    order: z.number(),
  }),
});

// Experience: one Markdown entry per job or education in src/content/experience/
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('job'),
      company: z.string(),
      role: z.string(),
      period: z.string(),
      duration: z.string().optional(),
      location: z.string(),
      summary: z.string(),
      highlights: z.array(z.string()).optional(),
      order: z.number(),
    }),
    z.object({
      kind: z.literal('education'),
      title: z.string(),
      organization: z.string().optional(),
      level: z.string().optional(),
      rncp: z.string().optional(),
      url: z.string().optional(),
      urlLabel: z.string().optional(),
      period: z.string(),
      duration: z.string().optional(),
      note: z.string().optional(),
      order: z.number(),
    }),
  ]),
});

// Projects collection: one typed Markdown entry per project in src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string().optional(),
    tags: z.array(z.string()),
    links: z
      .object({
        demo: z.string().optional(),
        code: z.string().optional(),
      })
      .optional(),
    order: z.number(),
  }),
});

export const collections = { site, skills, experience, projects };
