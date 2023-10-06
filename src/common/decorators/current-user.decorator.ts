import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type TCurrentUser = {
  id: string;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TCurrentUser;
  },
);
