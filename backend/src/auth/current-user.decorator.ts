import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest();
      return req.user;
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
      return GqlExecutionContext.create(ctx).getContext().req.user;
    }
  },
);

