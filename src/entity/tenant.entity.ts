import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  tenantid: string;

  @Column()
  tenantname: string;

  @Column()
  dbname: string;

  @Column()
  dbusername: string;

  @Column()
  dbpassword: string;

  @Column()
  dbhost: string;

  @Column()
  dbport: number;
}
