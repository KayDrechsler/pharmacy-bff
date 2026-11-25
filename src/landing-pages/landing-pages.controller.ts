import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { LandingPagesService } from './landing-pages.service.js';
import { SlugParamsDto } from './slug-params.dto.js';

@Controller('landing-pages')
export class LandingPagesController {
  constructor(private readonly landingPages: LandingPagesService) {}

  @Get()
  findSlugs() {
    return this.landingPages.findSlugs();
  }

  @Get(':slug')
  async findOne(@Param() params: SlugParamsDto) {
    const page = await this.landingPages.findOne(params.slug);
    if (!page) {
      throw new NotFoundException(`No landing page "${params.slug}"`);
    }
    return page;
  }
}
