import ListedBuildings from '~/data/listed_buildings';

/**
 * This is the metadat surrounding the Listed Buildings in Edinburgh
 * dataset. It includes contextual information, definitions of layer
 * constructors, sidebar components and map components.
 */

const ListedBuildingsMetadata = {
  name: 'Listed Buildings Edinburgh',
  description: `A GeoJson representation of listed building in the Edinburgh
        and Lothian Area. The data was sourced from Open Data Scotland.`,
  source: 'Open Data Scotland',
  url: 'https://opendata.scot/datasets/city+of+edinburgh+council-listed+buildings/',
  layerId: 'listed-buildings-edinburgh-geojson',
  data: ListedBuildings,
  configDefinition: 'geoJsonConfig',
  classDefinition: 'ClusteredGeoJsonLayer',
  sidebarComponents: ['card-list'],
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
