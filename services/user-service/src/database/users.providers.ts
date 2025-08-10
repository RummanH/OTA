import { config } from 'src/config';
import { UserEntity } from '../users/users.entity';
import { DataSource } from 'typeorm';

console.log(config());

export const userProviders = [
  {
    provide: config().usersRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
