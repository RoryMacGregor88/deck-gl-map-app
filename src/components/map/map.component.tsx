import DeckGL from '@deck.gl/react';

import { Map as ReactMapGL } from 'react-map-gl';

import { useMap, useVisualisations } from '~/hooks';

import { Popup } from '~/components';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = ({
  layers,
  viewState,
  mapStyle,
  updateViewState,
  selectedFeature,
  setSelectedFeature,
  componentProps,
}) => (
  <DeckGL
    onMove={updateViewState}
    initialViewState={viewState}
    controller={true}
    layers={[layers]}
  >
    <ReactMapGL mapboxAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={mapStyle}>
      {selectedFeature ? (
        <Popup
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
          componentProps={componentProps}
        />
      ) : null}
    </ReactMapGL>
  </DeckGL>
);

export default Map;
