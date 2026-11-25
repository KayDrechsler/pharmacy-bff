import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LandingPagesModule } from './landing-pages/landing-pages.module.js';

@Module({
  imports: [LandingPagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
