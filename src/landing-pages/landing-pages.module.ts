import { Module } from '@nestjs/common';
import { LandingPagesController } from './landing-pages.controller.js';
import { LandingPagesService } from './landing-pages.service.js';

@Module({
  controllers: [LandingPagesController],
  providers: [LandingPagesService],
})
export class LandingPagesModule {}
