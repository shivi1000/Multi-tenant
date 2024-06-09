import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  employeeid: string;

  @Column()
  employeename: string;

  @Column()
  employeeemail: string;

  @Column()
  employeemobile: string;
}
