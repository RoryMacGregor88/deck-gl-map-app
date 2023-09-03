import { Metadata } from '~/types';
import { Button } from '~/components';

interface Props {
  metadataList: Metadata[] | null;
  handleLayerClick: (id: string) => void;
}

const DatasetSelection = ({ metadataList, handleLayerClick }: Props) => {
  if (!metadataList) return null;
  return (
    <div className='absolute top-5 left-5 flex gap-4 p-4 z-10 text-white bg-black opacity-80 rounded-md border-2 border-solid border-white'>
      {metadataList.map(({ id, name, description, sourceUrl }) => {
        const onClick = () => handleLayerClick(id);
        return (
          <div
            key={id}
            className='flex flex-col gap-2 max-w-md rounded-md border-2 border-solid border-white p-4'
          >
            <h2>{name}</h2>
            <p>{description}</p>
            <div className='flex gap-2'>
              <a href={sourceUrl}>
                <Button>Visit Source</Button>
              </a>
              <Button onClick={onClick}>Load Dataset</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DatasetSelection;
