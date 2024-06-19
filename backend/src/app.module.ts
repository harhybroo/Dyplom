import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { UserEntity } from './users/entities/user.entity';
import { FileEntity } from './files/entities/file.entity';
import { PlacementModule } from './placement/placement.module';
import { GarageModule } from './garage/garage.module';
import { OfficeModule } from './office/office.module';
import { TradingModule } from './trading/trading.module';
import { StorageModule } from './storage/storage.module';
import { PlacementEntity } from './placement/entities/placement.entity';
import { StorageEntity } from './storage/entities/storage.entity';
import { GarageEntity } from './garage/entities/garage.entity';
import { OfficeEntity } from './office/entities/office.entity';
import { TradingEntity } from './trading/entities/trading.entity';
import { CardModule } from './card/card.module';
import { CardEntity } from './card/entities/card.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_HOST) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        PlacementEntity,
        StorageEntity,
        GarageEntity,
        OfficeEntity,
        FileEntity,
        TradingEntity,
        CardEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    PlacementModule,
    GarageModule,
    OfficeModule,
    TradingModule,
    StorageModule,
    AuthModule,
    FilesModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
