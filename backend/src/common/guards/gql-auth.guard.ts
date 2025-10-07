import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    // For the challenge: treat x-user-id header as the logged in user
    const userId = ctx.req.headers['x-user-id'];
    if (!userId) return false;
    ctx.userId = String(userId);
    return true;
  }
}
