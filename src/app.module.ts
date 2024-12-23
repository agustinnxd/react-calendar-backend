import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
require('dotenv').config();

@Module({
  imports: [AuthModule, 
    MongooseModule.forRoot(process.env.MONGO_CNN), EventsModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
