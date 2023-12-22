import { Region } from 'src/entities';
import { BaseRegionShortNameEnum } from 'src/entities/Region';

export const regionSeed: Region[] = [
  {
    name: 'Latin America',
    shortName: BaseRegionShortNameEnum.LATAM,
  },
  {
    name: 'Caribbean',
    shortName: BaseRegionShortNameEnum.CAR,
  },
  {
    name: 'United States',
    shortName: BaseRegionShortNameEnum.US,
  },
];
