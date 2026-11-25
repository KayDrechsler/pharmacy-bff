import { Matches } from 'class-validator';

export class SlugParamsDto {
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug may only contain lowercase letters, digits and dashes',
  })
  slug!: string;
}
