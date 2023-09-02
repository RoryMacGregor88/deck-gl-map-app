import { Metadata } from '~/types';

interface Props {
  metadataList: Metadata[];
  handleLayerClick: (id: string) => void;
}

const DatasetSelection = ({ metadataList, handleLayerClick }: Props) => (
  <div
    style={{ position: 'absolute', top: 10, left: 10, zIndex: 100000000000 }}
  >
    {metadataList.map(({ id, title, description, source }) => {
      const onClick = () => handleLayerClick(id);
      return (
        <div key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{source}</p>
          <button onClick={onClick}>Load Dataset</button>
        </div>
      );
    })}
  </div>
);

export default DatasetSelection;
