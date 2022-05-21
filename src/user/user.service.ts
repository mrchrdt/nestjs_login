import { Injectable, NotFoundException } from '@nestjs/common';
import { from, Observable, tap } from 'rxjs';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private _user: UserRepository) {}

  async getByEmail(email: string): Promise<User | undefined> {
    // return await this._user.findOne({ email: email });
    return await this._user.findOne({ email });
  }

  createUser(entity: User): Observable<User> {
    return from(this._user.createUser(entity));
  }

  updateUser(id: string, user: User): Observable<UpdateResult> {
    return from(this._user.update(id, user));
  }

  findUsers(): Observable<User[]> {
    return from(this._user.find());
  }

  findById(id: string): Observable<User> {
    return from(this._user.findOne(id));
  }

  resetPassword(id: string, password: string): Observable<UpdateResult> {
    return from(this._user.resetPassword(id, password));
  }

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this._user.delete(id));
  }
}
