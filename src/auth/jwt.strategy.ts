import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
  console.log('Inicializando JwtStrategy');
  console.log('Auth0 Domain:', process.env.AUTH0_DOMAIN);
  console.log('Auth0 Audience:', process.env.AUTH0_AUDIENCE);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`, 
      }),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`, 
      algorithms: ['RS256'],
    });
    console.log('JwtStrategy inicializada com:');
    console.log('- Domain:', process.env.AUTH0_DOMAIN);
    console.log('- Audience:', process.env.AUTH0_AUDIENCE);
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    return payload; 
  }
}