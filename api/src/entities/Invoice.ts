import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { TypeInvoice } from '../enums';
import DetailInvoice from './Detail-Invoice';
import Company from './Company';

@Entity()
export default class Invoice extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TypeInvoice, default: TypeInvoice.INVOICE })
  type: TypeInvoice;

  @Column({ unique: true, nullable: false  })
  folio: number;

  @Column({ type: 'timestamptz', nullable: false })
  issueDate: Date;

  @OneToMany(() => DetailInvoice, detail => detail.invoice, {
    cascade: true
  })
  details: DetailInvoice[];

  @OneToOne(() => Company)
  @JoinColumn()
  emitter: Company;

  @OneToOne(() => Company)
  @JoinColumn()
  receiver: Company;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

}
