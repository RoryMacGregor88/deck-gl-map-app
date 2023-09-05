import { Dispatch, SetStateAction } from 'react';
import { Feature, GeoJson } from '~/types';

interface CardProps {
  properties: { [key: string]: string | string[] };
}

const Card = ({ properties }: CardProps) => (
  <ul>
    {Object.entries(properties).map(([key, value]) => (
      <li key={key}>
        {key}: {value}
      </li>
    ))}
  </ul>
);

interface Props {
  data: GeoJson;
  componentProps: string[];
  selectedFeature: Feature;
  setSelectedFeature: Dispatch<SetStateAction<Feature>>;
}

const CardList = ({
  data,
  componentProps,
  selectedFeature,
  setSelectedFeature,
}: Props) => (
  <ul className='flex flex-col gap-2 text-inherit'>
    {data.features.slice(0, 10).map((feature) => {
      const { properties } = feature;

      /** Only pulls specified keys from datum */
      const { OBJECTID, ...filteredProperties } = Object.entries(
        properties
      ).reduce(
        (acc, [key, value]) =>
          componentProps.includes(key) ? { ...acc, [key]: value } : acc,
        {}
      );

      const isSelected = OBJECTID === selectedFeature?.OBJECTID;

      const handleClick = () => {
        setSelectedFeature(feature);
      };

      return (
        <li
          key={OBJECTID}
          className={`rounded-md ${
            isSelected ? 'border-red-600' : 'border-white'
          } border-2 p-4`}
          onClick={handleClick}
        >
          <Card properties={filteredProperties} />
        </li>
      );
    })}
  </ul>
);

export default CardList;
