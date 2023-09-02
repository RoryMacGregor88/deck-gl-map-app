import { useState, useEffect, ReactNode } from 'react';

import { layerFactory } from '~/utils/utils';

import useMap from '../map-context';

import configs from '~/configs';

const useDataSets = ({ selectedMetadata }) => {
  const { updateViewState } = useMap();

  // TODO: type properly
  const [layers, setLayers] = useState<unknown[]>([]);
  const [sidebarComponents, setSidebarComponents] = useState<ReactNode[]>([]);

  useEffect(() => {
    if (!selectedMetadata) return;

    console.log('HIT HHLKL: ', selectedMetadata);
    const { data, layerId, configDefinition, classDefinition } =
      selectedMetadata;

    const configFactory = configs[configDefinition],
      configuration = configFactory({ id: layerId, data, updateViewState });

    const layerInstance = layerFactory({
      classDefinition,
      configuration,
    });

    setLayers((prev) => [...prev, layerInstance]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetadata]);

  // useEffect(() => {
  //   const Component = <SidebarList data={ListedBuildings} />;
  //   setSidebarComponents([Component]);
  // }, []);

  return { layers, sidebarComponents };
};

export default useDataSets;
