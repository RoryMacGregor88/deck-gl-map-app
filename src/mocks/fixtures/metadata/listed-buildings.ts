/**
 * This is the metadat surrounding the Listed Buildings in Edinburgh
 * dataset. It includes contextual information, definitions of layer
 * constructors, sidebar components and map components.
 */

const ListedBuildingsMetadata = {
  id: 'listed-buildings-edinburgh-geojson',
  name: 'Listed Buildings Edinburgh',
  description: `A GeoJson representation of listed building in the Edinburgh
        and Lothian Area. Data sourced from Open Data Scotland.`,
  source: 'Open Data Scotland',
  sourceUrl:
    'https://opendata.scot/datasets/city+of+edinburgh+council-listed+buildings/',
  dataUrl: '/api/data/listed_buildings_edinburgh',
  configDefinition: 'geoJsonConfig',
  classDefinition: 'ClusteredGeoJsonLayer',
  sidebarComponents: ['CardList'],
  mapProps: {
    zoom: 11,
    longitude: -3.29,
    latitude: 55.94,
  },
  componentProps: [
    'ENT_TITLE',
    'CREATED',
    'COMPILER',
    'DES_TYPE',
    'CATEGORY',
    'CLASS',
    'LOCAL_AUTH',
  ],
};

export default ListedBuildingsMetadata;
