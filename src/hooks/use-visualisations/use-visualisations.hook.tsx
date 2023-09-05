import { useState, useEffect, FC } from 'react';

import { layerFactory } from '~/utils/utils';
import configs from '~/configs';
import { Feature, GeoJson, Layer, Metadata, SidebarComponent } from '~/types';
import { CardList } from '~/components';

const sidebarComponentDefinitions: { [key: string]: FC<Feature[]> } = {
  CardList: CardList,
};

interface Props {
  selectedMetadata: Metadata | null;
}

const useVisualisations = ({
  selectedMetadata,
  updateViewState,
  selectedFeature,
  setSelectedFeature,
}: Props) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [sidebarComponents, setSidebarComponents] = useState<
    SidebarComponent[]
  >([]);

  useEffect(() => {
    if (!selectedFeature) return;

    const {
      geometry: { coordinates },
    } = selectedFeature;
    updateViewState({
      longitude: coordinates[0],
      latitude: coordinates[1],
      zoom: 20,
    });
  }, [selectedFeature]);

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

      // TODO: can't be fetching data every time
      const res = await fetch(dataUrl);

      if (!res.ok) {
        console.error(
          'An error occurred while fetching data from useVisualisations'
        );
      }

      const data: GeoJson = await res.json();

      const configFactory = configs[configDefinition],
        configuration = configFactory({
          id,
          data,
          updateViewState,
          selectedFeature,
          setSelectedFeature,
        });

      const layerInstance = layerFactory({
        classDefinition,
        configuration,
      });

      setLayers([layerInstance]);

      const SidebarComponents = sidebarComponents.map((componentDefinition) => {
        const Component = sidebarComponentDefinitions[componentDefinition];
        return (
          <Component
            data={data}
            componentProps={componentProps}
            selectedFeature={selectedFeature}
            setSelectedFeature={setSelectedFeature}
          />
        );
      });

      setSidebarComponents(SidebarComponents);

      // TODO use turf bbox to do this?
      /** Move map and zoom to dataset */
      // updateViewState(mapProps);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetadata, selectedFeature]);

  return { layers, sidebarComponents };
};

export default useVisualisations;
