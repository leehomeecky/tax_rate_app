import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxModule } from './module/tax/tax.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import {
  Country,
  ProductAndService,
  Region,
  Tax,
  TaxLookUpHistory,
} from './entities';

config();
const {
  DB_PORT,
  DB_HOST: host,
  DB_NAME: database,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_ENDPOINT_ID: ENDPOINT_ID,
} = process.env;

export const dbConfig = {
  type: 'postgres',
  host,
  port: +DB_PORT,
  password,
  username,
  database,
  synchronize: true,
  logging: false,
  ssl: true,
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  options: { encrypt: false },
  debug: process.env.ALLOW_TYPEORM_DEBUG === 'true',
  entities: [Tax, TaxLookUpHistory, Country, Region, ProductAndService],
} as TypeOrmModuleOptions;

export const appImports = [
  TypeOrmModule.forRoot(dbConfig),
  TypeOrmModule.forFeature([Country, Region, ProductAndService]),
  TaxModule,
];

@Module({
  imports: appImports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
