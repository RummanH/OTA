import { UserEntity } from '../users/users.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
