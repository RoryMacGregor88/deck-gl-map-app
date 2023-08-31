import { GeoJsonLayer } from '@deck.gl/layers/typed';

import { LayerName } from '~/types';

const LAYER_CLASSES = {
  GeoJsonLayer,
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
