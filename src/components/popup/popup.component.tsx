import { Popup as ReactMapGlPopup } from 'react-map-gl';

const Popup = ({ selectedFeature, setSelectedFeature, componentProps }) => {
  const handleClose = () => setSelectedFeature(null);

  const {
    properties,
    geometry: { coordinates },
  } = selectedFeature;

  return (
    <ReactMapGlPopup
      longitude={coordinates[0]}
      latitude={coordinates[1]}
      offset={40}
      onClose={handleClose}
    >
      <ul>
        {Object.entries(properties).map(([key, value]) =>
          componentProps.includes(key) ? (
            <li>
              {key}: {value}
            </li>
          ) : null
        )}
      </ul>
    </ReactMapGlPopup>
  );
};

export default Popup;
