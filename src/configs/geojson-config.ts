import { ConfigArgs } from '~/types';
import iconAtlas from './geojson-icon-atlas.svg';
import iconMapping from './geojson-icon-mapping.json';

const geoJsonConfig = ({ id, data, updateViewState }: ConfigArgs) => {
  const onClick = (info) => console.log('ICON: ', info.object.properties);

  const getIcon = () => 'pin-red';

  const onClusterClick = (zoom: number) => updateViewState({ zoom });

  return {
    id,
    data: data.features,
    onClick,
    onClusterClick,
    iconAtlas,
    iconMapping,
    getIcon,
    getPosition: (feat) => feat.geometry.coordinates,
    getIconSize: 30,
    iconSizeScale: 4,
    clusterIconName: 'cluster',
    clusterIconSize: 30,
    pickable: true,
    visible: true,
  };
};

export default geoJsonConfig;
