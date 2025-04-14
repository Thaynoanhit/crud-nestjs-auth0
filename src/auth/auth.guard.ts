import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

@Inject()
private readonly JwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if(!authorization) throw new UnauthorizedException('Token is required');
    
    try{
      const payload = await this.JwtService.verifyAsync(authorization, {
          secret: process.env.SECRET_KEY,
        },
      );
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
      }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
