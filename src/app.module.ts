import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
require('dotenv').config();

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_CNN), EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
