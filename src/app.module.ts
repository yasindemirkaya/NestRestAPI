import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hyper4:hyper4123@webprojectscluster.rdtsnfh.mongodb.net/NestRestAPI?retryWrites=true&w=majority&appName=WebProjectsCluster')
  ],
})
export class AppModule { }