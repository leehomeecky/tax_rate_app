import { Country, Region } from 'src/entities';
import { BaseRegionShortNameEnum } from 'src/entities/Region';
import { getRepository } from 'typeorm';

export const computeBaseRegion = async () => {
  const region = await getRepository(Region)
    .createQueryBuilder('region')
    .getMany();

  const baseRegionObject = {};
  Object.values(BaseRegionShortNameEnum).forEach((val) => {
    region.forEach((regionVal) => {
      regionVal.shortName === val ? (baseRegionObject[val] = regionVal) : null;
    });
  });

  return baseRegionObject;
};

export const countrySeed = async (): Promise<Country[]> => {
  const baseRegion = await computeBaseRegion();
  const countrySeedValue: Country[] = [
    {
      name: 'Argentina',
      countryCode: 'AR',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Bolivia',
      countryCode: 'BO',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Brazil',
      countryCode: 'BR',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Chile',
      countryCode: 'CL',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Colombia',
      countryCode: 'CO',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Costa Rica',
      countryCode: 'CR',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Cuba',
      countryCode: 'CU',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Dominican Republic',
      countryCode: 'DO',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Ecuador',
      countryCode: 'EC',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'El Salvador',
      countryCode: 'SV',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Guatemala',
      countryCode: 'GT',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Honduras',
      countryCode: 'HN',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Mexico',
      countryCode: 'MX',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Nicaragua',
      countryCode: 'NI',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Panama',
      countryCode: 'PA',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Paraguay',
      countryCode: 'PY',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Peru',
      countryCode: 'PE',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Uruguay',
      countryCode: 'UY',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Venezuela',
      countryCode: 'VE',
      region: baseRegion[BaseRegionShortNameEnum.LATAM],
    },
    {
      name: 'Antigua and Barbuda',
      countryCode: 'AG',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Bahamas',
      countryCode: 'BS',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Barbados',
      countryCode: 'BB',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Cayman Islands',
      countryCode: 'KY',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Curaçao',
      countryCode: 'CW',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Dominica',
      countryCode: 'DM',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Grenada',
      countryCode: 'GD',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Haiti',
      countryCode: 'HT',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Jamaica',
      countryCode: 'JM',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Puerto Rico',
      countryCode: 'PR',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Saint Kitts and Nevis',
      countryCode: 'KN',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Saint Lucia',
      countryCode: 'LC',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Saint Vincent and the Grenadines',
      countryCode: 'VC',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'Trinidad and Tobago',
      countryCode: 'TT',
      region: baseRegion[BaseRegionShortNameEnum.CAR],
    },
    {
      name: 'United States',
      countryCode: 'US',
      region: baseRegion[BaseRegionShortNameEnum.US],
    },
  ];

  return countrySeedValue;
};
