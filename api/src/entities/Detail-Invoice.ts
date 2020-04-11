import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import Invoice from './Invoice';

@Entity()
export default class DetailInvoice extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false  })
  amount: number;

  @Column({ nullable: false })
  tax: number;

  @ManyToOne(() => Invoice, invoice => invoice.details)
  invoice: Invoice;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

}
