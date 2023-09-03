import { useState, useEffect, FC } from 'react';

import { layerFactory } from '~/utils/utils';

import useMap from '../map-context';

import configs from '~/configs';
import { GeoJson, Layer, Metadata, SidebarComponent } from '~/types';
import { CardList } from '~/components';

const sidebarComponentDefinitions: { [key: string]: FC<unknown> } = {
  CardList: CardList,
};

interface Props {
  selectedMetadata: Metadata | null;
}

const useVisualisations = ({ selectedMetadata }: Props) => {
  const { updateViewState } = useMap();

  const [layers, setLayers] = useState<Layer[]>([]);
  const [sidebarComponents, setSidebarComponents] = useState<
    SidebarComponent[]
  >([]);

  useEffect(() => {
    (async () => {
      if (!selectedMetadata) return;

      const {
        dataUrl,
        id,
        configDefinition,
        classDefinition,
        sidebarComponents,
        componentProps,
        mapProps,
      } = selectedMetadata;

      const data: GeoJson = await (await fetch(dataUrl)).json();

      const configFactory = configs[configDefinition],
        configuration = configFactory({ id, data, updateViewState });

      const layerInstance = layerFactory({
        classDefinition,
        configuration,
      });

      setLayers([layerInstance]);

      const SidebarComponents = sidebarComponents.map((componentDefinition) => {
        const Component = sidebarComponentDefinitions[componentDefinition];
        return <Component data={data} componentProps={componentProps} />;
      });

      setSidebarComponents(SidebarComponents);

      // TODO use turf bbox to do this?
      /** Move map and zoom to dataset */
      updateViewState(mapProps);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetadata]);

  return { layers, sidebarComponents };
};

export default useVisualisations;
