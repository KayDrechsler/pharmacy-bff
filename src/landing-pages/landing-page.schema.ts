import { z } from 'zod';

const TextNode = z.object({
  type: z.literal('text'),
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
});
const LinkNode = z.object({
  type: z.literal('link'),
  href: z.string(),
  children: z.array(TextNode),
});
const InlineNode = z.discriminatedUnion('type', [TextNode, LinkNode]);

const RichTextNode = z.discriminatedUnion('type', [
  z.object({ type: z.literal('paragraph'), children: z.array(InlineNode) }),
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3)]),
    children: z.array(InlineNode),
  }),
  z.object({
    type: z.literal('list'),
    ordered: z.boolean(),
    items: z.array(z.array(InlineNode)),
  }),
]);

const Block = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    id: z.string(),
    headline: z.string(),
    subline: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    tone: z.enum(['default', 'dark', 'plain', 'promo']).optional(),
  }),
  z.object({
    type: z.literal('teaserGrid'),
    id: z.string(),
    title: z.string(),
    collection: z.string(),
  }),
  z.object({
    type: z.literal('richText'),
    id: z.string(),
    content: z.array(RichTextNode),
  }),
  z.object({
    type: z.literal('faq'),
    id: z.string(),
    title: z.string(),
    items: z.array(
      z.object({ question: z.string(), answer: z.array(RichTextNode) }),
    ),
  }),
]);

export const LandingPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  blocks: z.array(Block),
});

export type LandingPage = z.infer<typeof LandingPageSchema>;
