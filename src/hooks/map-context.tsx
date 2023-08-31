import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  ReactNode,
} from 'react';

const INITIAL_VIEW_STATE = {
  zoom: 6,
  longitude: -4.84,
  latitude: 54.71,
  pitch: 0,
  bearing: 0,
};

const DEFAULT_MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

export const MapContext = createContext(undefined);
MapContext.displayName = 'MapContext';

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface MapContextType {
  viewState: ViewState;
  setViewState: SetStateAction<ViewState>;
  updateViewState: (newViewState: Partial<ViewState>) => void;
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

  const resetViewState = () => setViewState(INITIAL_VIEW_STATE);

  const value = {
    viewState,
    setViewState,
    updateViewState,
    resetViewState,
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
