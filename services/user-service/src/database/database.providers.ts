import { DATABASE_TYPE, DATABASE_URL } from 'src/common/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: DATABASE_TYPE,
        url: DATABASE_URL,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
      });

      return dataSource.initialize();
    },
  },
];
