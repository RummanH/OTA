import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: 'postgresql://postgres.fzydeenysglmqmwoxdhg:rumman103@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
