import { type TWithoutFunctions } from "src/common/typeWithoutFunctions";
import { BaseGlobalEntity } from "src/entities/base.global-entity";
import { EventCategory } from "src/entities/event_category.entity";
import { Note } from "src/entities/note.entity";
import { Column, Entity, OneToMany } from "typeorm";

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

  @OneToMany(
    () => EventCategory,
    (eventCategory: EventCategory) => eventCategory.user,
  )
  eventCategories: EventCategory[];

  @OneToMany(() => Note, (note: Note) => note.user)
  notes: Note[];
}

export type TUser = Omit<TWithoutFunctions<User>, "password">;
export type TRequestUser = Request & { user: TUser };
