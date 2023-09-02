import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  ReactNode,
} from 'react';

import { FlyToInterpolator } from '@deck.gl/core/typed';

const INITIAL_VIEW_STATE = {
  zoom: 8,
  longitude: -3.29,
  latitude: 55.94,
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
};

const DEFAULT_MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

export const MapContext = createContext(undefined);
MapContext.displayName = 'MapContext';

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration: number;
  transitionInterpolator: FlyToInterpolator;
}

export type UpdateViewState = (newViewState: Partial<ViewState>) => void;

interface MapContextType {
  viewState: ViewState;
  setViewState: SetStateAction<ViewState>;
  updateViewState: UpdateViewState;
  resetViewState: () => void;
  mapStyle: string;
  setMapStyle: SetStateAction<string>;
}

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);
  const [mapStyle, setMapStyle] = useState(DEFAULT_MAP_STYLE);

  const updateViewState = (newViewState: ViewState) =>
    setViewState((currentViewState) => ({
      ...currentViewState,
      ...newViewState,
    }));

  const handleDrag = ({ viewport }) => {
    const { longitude, latitude } = viewport;
    updateViewState({
      longitude,
      latitude,
    });
  };

  const resetViewState = () => setViewState(INITIAL_VIEW_STATE);

  const value = {
    viewState,
    setViewState,
    updateViewState,
    resetViewState,
    handleDrag,
    mapStyle,
    setMapStyle,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (context === undefined) throw Error('Wrap your app with <MapProvider />');
  return context;
};

export default useMap;
