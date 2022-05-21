import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  constructor(
    name: string,
    email: string,
    password: string,
    nationalId: string,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.nationalId = nationalId;
    this.password = password;
  }

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nationalId?: string;

  // functions
  encodePassword(password: string): void {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
  }

  compareHashPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
