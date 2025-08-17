import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rumman:0ORTxdrHzpxq6xST@cluster0.zttphos.mongodb.net/flights?retryWrites=true&w=majority', {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('Mongo DB is connected!'));
        return connection;
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
