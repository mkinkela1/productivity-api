import { BaseGlobalEntity } from "src/entities/base.global-entity";
import { User } from "src/entities/user.entity";
import { type TWithoutFunctions } from "src/utils/typeWithoutFunctions";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: "event_category" })
export class EventCategory extends BaseGlobalEntity {
  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: false, length: 255 })
  colorHex: string;

  @ManyToOne(() => User, (user) => user.eventCategories, { eager: true })
  user: User;
}

export type TEventCategory = TWithoutFunctions<EventCategory>;
