import { useState } from 'react';
import { Sidebar, Map, DatasetSelection } from '~/components';
import useDataSets from '~/hooks/use-datasets/use-datasets.hook';
import metadataList from '~/metadata';

const App = () => {
  const [selectedMetadata, setSelectedMetadata] = useState(null);

  // TODO: rename this useVisualisations
  const { layers, setLayerVisibility, sidebarComponents } = useDataSets({
    selectedMetadata,
  });

  const handleLayerClick = (id) =>
    setSelectedMetadata(
      metadataList.find(({ metadataId }) => metadataId === id)
    );

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* <Sidebar
        setLayerVisibility={setLayerVisibility}
        sidebarComponents={sidebarComponents}
      /> */}
      <DatasetSelection
        metadataList={metadataList}
        handleLayerClick={handleLayerClick}
      />
      <Map layers={layers} />
    </div>
  );
};

export default App;
