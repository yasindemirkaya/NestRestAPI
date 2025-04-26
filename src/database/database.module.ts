import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

@Module({
  imports: [MongooseModule.forRoot(mongoUri)],
})
export class DatabaseModule {}
