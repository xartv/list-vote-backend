import { ConfigService } from '@nestjs/config';

export const getCookieOptions = (configService: ConfigService) => {
  const domain = configService.get('COOKIE_DOMAIN', 'localhost');

  return {
    httpOnly: true,
    domain,
    secure: true,
    sameSite: 'lax',
  } as const;
};
