import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country, ProductAndService, Region } from './entities';
import { Repository } from 'typeorm';
import { regionSeed } from './seeds/region.seed';
import { productServiceSeed } from './seeds/productAndService.seed';
import { countrySeed } from './seeds/country.seed';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(ProductAndService)
    private readonly productAndServiceRepo: Repository<ProductAndService>,
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,
  ) {}
  async onModuleInit() {
    const country = await this.countryRepo.findOne();
    const region = await this.regionRepo.findOne();
    const productAndService = await this.productAndServiceRepo.findOne();

    if (!region) {
      Logger.log('>>>>>>>>> region seeding started');
      await this.regionRepo.save(regionSeed);
      Logger.log('>>>>>>>>> region seeding completed');
    }
    if (!productAndService) {
      Logger.log('>>>>>>>>> productAndService seeding started');
      await this.productAndServiceRepo.save(productServiceSeed);
      Logger.log('>>>>>>>>> productAndService seeding completed');
    }
    if (!country) {
      Logger.log('>>>>>>>>> country seeding started');
      await this.countryRepo.save(await countrySeed());
      Logger.log('>>>>>>>>> country seeding completed');
    }
  }
  getHello(): string {
    return 'Server up!';
  }
}
