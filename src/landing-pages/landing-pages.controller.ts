import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { LandingPagesService } from './landing-pages.service.js';

@Controller('landing-pages')
export class LandingPagesController {
  constructor(private readonly landingPages: LandingPagesService) {}

  @Get()
  findSlugs() {
    return this.landingPages.findSlugs();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const page = await this.landingPages.findOne(slug);
    if (!page) {
      throw new NotFoundException(`No landing page "${slug}"`);
    }
    return page;
  }
}
