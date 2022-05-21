import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(user: any) {
    const entity = new User(
      user.name,
      user.email,
      user.password,
      user.nationalId,
    );
    entity.encodePassword(user.password);
    return this.save(entity);
  }

  async resetPassword(id: string, password: string): Promise<UpdateResult> {
    const user = await this.findOne(id);
    if (!user) return;
    user.encodePassword(password);
    return this.update(user.id, user);
  }
}
