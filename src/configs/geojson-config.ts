import { SetStateAction } from 'react';
import iconAtlas from './geojson-icon-atlas.svg';
import iconMapping from './geojson-icon-mapping.json';
import useMap, { UpdateViewState, ViewState } from '~/hooks/map-context';

type GeoJson = {
  type: string;
  features: { [key: string]: unknown }[];
};

interface ConfigArgs {
  id: string;
  data: GeoJson;
  visible: boolean;
  color: string;
  updateViewstate: UpdateViewState;
}

const geoJsonConfig = ({ id, data, updateViewstate }: ConfigArgs) => {
  const onClick = (info) => console.log('ICON: ', info.object.properties);
  const getIcon = () => `pin-${color}`;
  const onClusterClick = (zoom) => updateViewstate({ zoom });
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
