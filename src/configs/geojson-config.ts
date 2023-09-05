import { ConfigArgs, Feature } from '~/types';
// import iconAtlas from './geojson-icon-atlas.svg';
// import iconMapping from './geojson-icon-mapping.json';
import iconAtlas from './safers-pins.svg';
import iconMapping from './safers-pins.json';

const geoJsonConfig = ({
  id,
  data,
  updateViewState,
  selectedFeature,
  setSelectedFeature,
}: ConfigArgs) => {
  const onFeatureClick = (feature: Feature) => setSelectedFeature(feature);

  /** Must be outside because calls react state setter */
  const onClusterClick = (zoom: number) => updateViewState({ zoom });

  return {
    id,
    data: data.features,
    featureIdAccessor: 'OBJECTID',
    selectedFeature: selectedFeature ?? {},
    onFeatureClick,
    onClusterClick,
    iconAtlas,
    iconMapping,
  };
};

export default geoJsonConfig;
