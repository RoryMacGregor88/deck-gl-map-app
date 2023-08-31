import iconAtlas from './geojson-icon-atlas.svg';
import iconMapping from './geojson-icon-mapping.json';

type GeoJson = {
  type: string;
  features: { [key: string]: unknown }[];
};

interface ConfigArgs {
  id: string;
  data: GeoJson;
  visible: boolean;
  color: string;
}

const configuration = ({ id, data, visible, color }: ConfigArgs) => {
  const onClick = ({ object: { properties } }) => {
    console.log('CLICKED: ', properties);
  };
  console.log('color: ', color);

  const getIcon = (d) => `pin-${color}`;

  return {
    id,
    data,
    onClick,
    pointType: 'icon',
    iconAtlas,
    iconMapping,
    getIcon,
    getIconSize: 4,
    iconSizeScale: 4,
    pickable: true,
    visible,
  };
};

export default configuration;
