import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class LandingPagesService {
  private async readAll(): Promise<{ slug: string }[]> {
    const raw = await readFile(
      join(process.cwd(), 'data', 'landing-pages.json'),
      'utf-8',
    );
    return JSON.parse(raw) as { slug: string }[];
  }

  async findSlugs(): Promise<string[]> {
    return (await this.readAll()).map((page) => page.slug);
  }

  async findOne(slug: string) {
    return (await this.readAll()).find((page) => page.slug === slug);
  }
}
