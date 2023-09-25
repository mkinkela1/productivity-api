import { IsDate } from "class-validator";
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
  private addId() {
    this.id = uuid();
  }

  @Column({ name: "updated_at", nullable: true })
  @IsDate()
  updatedAt?: Date;

  @AfterUpdate()
  private setUpdatedAt() {
    this.updatedAt = new Date();
  }

  createDateTime: Date;
  @AfterInsert()
  private getDateTime() {
    this.createDateTime = new Date(timestamp(this.id));
  }

  @Column({ type: "text", nullable: true })
  comment?: string;
}
