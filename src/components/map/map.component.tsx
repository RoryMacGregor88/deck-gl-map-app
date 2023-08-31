import DeckGL from '@deck.gl/react';

import { Map as ReactMapGL } from 'react-map-gl';

import useMap from '~/hooks/map-context';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = ({ layers }) => {
  const { viewState, mapStyle } = useMap();
  return (
    <DeckGL initialViewState={viewState} controller={true} layers={[layers]}>
      <ReactMapGL mapboxAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={mapStyle} />
    </DeckGL>
  );
};

export default Map;
