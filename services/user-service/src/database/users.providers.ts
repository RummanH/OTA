import { USER_REPOSITORY } from 'src/common/constants';
import { UserEntity } from '../users/users.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
