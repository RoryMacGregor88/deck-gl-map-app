import { useState, useEffect } from 'react';

import { layerFactory } from '~/utils/utils';

import configFn from '~/configs/geojson-config';

import ShopData1986 from '~/data/shop_survey_1986.js';
import ShopData2015 from '~/data/shop_survey_2015.js';

const useDataSets = () => {
  // TODO: type properly
  const [layers, setLayers] = useState<unknown[]>([]);
  const [layerVisibility, setLayerVisibility] = useState({
    '1986': true,
    '2015': false,
  });

  console.log('layerVisibility: ', layerVisibility);

  useEffect(() => {
    const classDefinition = 'GeoJsonLayer';

    const config1986 = configFn({
        id: 'geojson-layer',
        data: ShopData1986,
        visible: layerVisibility['1986'],
        color: 'red',
      }),
      layer1986 = layerFactory({
        classDefinition,
        configuration: config1986,
      });

    const config2015 = configFn({
        id: 'geojson-layer',
        data: ShopData2015,
        visible: layerVisibility['2015'],
        color: 'purple',
      }),
      layer2015 = layerFactory({
        classDefinition,
        configuration: config2015,
      });

    setLayers(() => [layer1986, layer2015]);
  }, [layerVisibility]);

  return { layers, setLayerVisibility };
};

export default useDataSets;
