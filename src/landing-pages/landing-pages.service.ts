import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LandingPageSchema, type LandingPage } from './landing-page.schema.js';

@Injectable()
export class LandingPagesService {
  private readonly logger = new Logger(LandingPagesService.name);

  private async readAll(): Promise<LandingPage[]> {
    const raw = await readFile(
      join(process.cwd(), 'data', 'landing-pages.json'),
      'utf-8',
    );
    const entries: unknown = JSON.parse(raw);

    if (!Array.isArray(entries)) {
      this.logger.error('Content file is not an array');
      return [];
    }

    const pages: LandingPage[] = [];
    for (const entry of entries) {
      const result = LandingPageSchema.safeParse(entry);
      if (result.success) {
        pages.push(result.data);
      } else {
        this.logger.error(
          `Invalid landing page skipped: ${JSON.stringify(result.error.issues)}`,
        );
      }
    }
    return pages;
  }

  async findSlugs(): Promise<string[]> {
    return (await this.readAll()).map((page) => page.slug);
  }

  async findOne(slug: string): Promise<LandingPage | undefined> {
    return (await this.readAll()).find((page) => page.slug === slug);
  }
}
