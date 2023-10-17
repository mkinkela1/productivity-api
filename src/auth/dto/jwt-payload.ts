import { IsUUID } from "class-validator";

export class JwtPayload {
  @IsUUID()
  id: string;

  constructor(obj: JwtPayload) {
    Object.assign(this, obj);
  }
}
