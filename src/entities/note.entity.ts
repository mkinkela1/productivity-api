import { TWithoutFunctions } from "src/common/typeWithoutFunctions";
import { BaseGlobalEntity } from "src/entities/base.global-entity";
import { User } from "src/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: "note" })
export class Note extends BaseGlobalEntity {
  @Column({ nullable: false, length: 255 })
  title: string;

  @Column({ nullable: true, length: 255 })
  content: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}

export type TNote = TWithoutFunctions<Note>;
