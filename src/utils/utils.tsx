import { GeoJsonLayer } from '@deck.gl/layers/typed';
import ClusteredGeoJsonLayer from '../custom-layers/clustered-geojson-icon-layer';

import { LayerName } from '~/types';

const LAYER_CLASSES = {
  GeoJsonLayer,
  ClusteredGeoJsonLayer,
};

interface LayerFactoryArgs {
  classDefinition: LayerName;
  configuration: { [key: string]: unknown };
}

const layerFactory = ({ classDefinition, configuration }: LayerFactoryArgs) => {
  const Class = LAYER_CLASSES[classDefinition];
  return new Class(configuration);
};

export { layerFactory };
