import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import uuid, { timestamp } from "ui7";

export abstract class BaseGlobalEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @AfterUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  createDateTime: Date;
  @AfterInsert()
  getDateTime() {
    this.createDateTime = new Date(timestamp(this.id));
  }

  @Column()
  comment: string;
}
