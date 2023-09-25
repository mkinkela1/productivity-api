import { BaseGlobalEntity } from "src/entities/base.global-entity";
import { type TWithoutFunctions } from "src/utils/typeWithoutFunctions";
import { Column, Entity } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseGlobalEntity {
  @Column({ unique: true, nullable: false, length: 255 })
  email: string;

  @Column({ nullable: false, length: 255 })
  password: string;

  @Column({ nullable: false, length: 255 })
  firstName: string;

  @Column({ nullable: false, length: 255 })
  lastName: string;
}

export type TUser = Omit<TWithoutFunctions<User>, "password">;
