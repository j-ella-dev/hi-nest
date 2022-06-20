import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//@(Decorator) : 클래스에 함수 기능 추가
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
