import { GeoJsonLayer } from '@deck.gl/layers/typed';

// TODO: proper type for data
interface Props {
  id: string;
  data: unknown;
  iconAtlas: SVGElement;
  iconMapping: { [key: string]: unknown };
}

const test = new GeoJsonLayer();

export default ClusteredIconLayer;
