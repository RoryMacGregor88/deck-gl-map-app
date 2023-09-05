import { useEffect, useState } from 'react';
import { Sidebar, Map, DatasetSelection } from '~/components';
import { useMap, useVisualisations } from '~/hooks';
import { Feature, Metadata } from './types';

const App = () => {
  const [metadataList, setMetadataList] = useState<Metadata[] | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata | null>(
    null
  );
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const { updateViewState, viewState, mapStyle } = useMap();

  const { layers, sidebarComponents } = useVisualisations({
    selectedMetadata,
    updateViewState,
    selectedFeature,
    setSelectedFeature,
  });

  const { componentProps } = selectedMetadata ?? {};

  /** Fetch metadata objects for datasets */
  useEffect(() => {
    (async () => {
      if (!metadataList) {
        const metadataList = await (await fetch('/api/metadata')).json();
        setMetadataList(metadataList);
      }
    })();
  }, [metadataList]);

  const handleLayerClick = (selectedId: string) => {
    if (!metadataList) return;
    const selectedMetadata = metadataList.find(({ id }) => id === selectedId);
    if (selectedMetadata) setSelectedMetadata(selectedMetadata);
  };

  const hasSidebarComponents = !!sidebarComponents.length;

  return (
    <div className='relative h-screen w-100'>
      <DatasetSelection
        metadataList={metadataList}
        handleLayerClick={handleLayerClick}
      />
      {hasSidebarComponents ? (
        <Sidebar sidebarComponents={sidebarComponents} />
      ) : null}
      <Map
        layers={layers}
        viewState={viewState}
        mapStyle={mapStyle}
        updateViewState={updateViewState}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
        componentProps={componentProps}
      />
    </div>
  );
};

export default App;
