import { Sidebar, Map } from '~/components';
import useDataSets from '~/hooks/use-datasets/use-datasets.hook';

const App = () => {
  const { layers, setLayerVisibility } = useDataSets();
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Sidebar setLayerVisibility={setLayerVisibility} />
      <Map layers={layers} />
    </div>
  );
};

export default App;
