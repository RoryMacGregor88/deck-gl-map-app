import { useEffect, useState } from 'react';
import { Sidebar, Map, DatasetSelection } from '~/components';
import useVisualisations from '~/hooks/use-visualisations/use-visualisations.hook';
import { Metadata } from './types';

const App = () => {
  const [metadataList, setMetadataList] = useState<Metadata[] | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata | null>(
    null
  );

  const { layers, sidebarComponents } = useVisualisations({
    selectedMetadata,
  });

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
      <Map layers={layers} />
    </div>
  );
};

export default App;
