import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Company extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false  })
  rut: string;

  @Column({ nullable: false  })
  businessName: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

}
