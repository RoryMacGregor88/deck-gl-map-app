import { GeoJson } from '~/types';

const Card = ({ properties }) => (
  <ul>
    {Object.entries(properties).map(([key, value]) => (
      <li>
        {key}: {value}
      </li>
    ))}
  </ul>
);

interface Props {
  data: GeoJson;
  componentProps: string[];
}

const CardList = ({ data, componentProps }: Props) => (
  <ul className='flex flex-col gap-2 text-inherit'>
    {data.features.slice(0, 10).map(({ properties }) => {
      const filteredProperties = Object.entries(properties).reduce(
        (acc, [key, value]) =>
          componentProps.includes(key) ? { ...acc, [key]: value } : acc,
        {}
      );
      return (
        <li className='rounded-md border-white border-2 p-4'>
          <Card properties={filteredProperties} />
        </li>
      );
    })}
  </ul>
);

export default CardList;
