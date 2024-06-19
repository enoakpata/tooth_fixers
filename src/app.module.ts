import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientRegistrationModule } from './patient-registration/patient-registration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'toothfixers',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PatientRegistrationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}