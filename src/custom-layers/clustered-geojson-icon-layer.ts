import { CompositeLayer } from '@deck.gl/core/typed';
import { IconLayer, TextLayer } from '@deck.gl/layers/typed';
import Supercluster from 'supercluster';

const DEFAULT_CLUSTER_MAX_ZOOM = 16;
const DEFAULT_CLUSTER_RADIUS = 40;

interface ShouldUpdateStateArgs {
  changeFlags: {
    somethingChanged: boolean;
  };
}

// TODO: proper type for data
interface Props {
  id: string;
  data: unknown;
  iconAtlas: SVGElement;
  iconMapping: { [key: string]: unknown };
  clusterIconName: string;
  clusterSize: number;
}

class ClusteredGeoJsonIconLayer extends CompositeLayer {
  shouldUpdateState({ changeFlags }: ShouldUpdateStateArgs) {
    return changeFlags.somethingChanged;
  }

  updateState({ props, oldProps, changeFlags }) {
    const { maxZoom, clusterRadius } = this.props;

    const shouldRebuildSpatialIndex =
      changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (shouldRebuildSpatialIndex) {
      const spatialIndex = new Supercluster({
        maxZoom: maxZoom ?? DEFAULT_CLUSTER_MAX_ZOOM,
        radius: clusterRadius ?? DEFAULT_CLUSTER_RADIUS,
      });
      spatialIndex.load(
        props.data.map((datum) => ({
          geometry: { coordinates: this.props.getPosition(datum) },
          properties: datum.properties,
        }))
      );
      this.setState({ spatialIndex });
    }

    const integerZoom = Math.floor(this.context.viewport.zoom);
    if (shouldRebuildSpatialIndex || integerZoom !== this.state.z) {
      this.setState({
        data: this.state.spatialIndex.getClusters(
          [-180, -85, 180, 85],
          integerZoom
        ),
        integerZoom,
      });
    }
  }

  _getClusterText(feature) {
    return feature.properties.cluster
      ? `${feature.properties.point_count}`
      : ` `;
  }

  _getIcon(feat) {
    if (feat.properties.cluster) {
      // TODO: this was different, involved group icon and _getExpansionZoom
      return this.props.clusterIconName;
    }
    // TODO: this was a ternary before
    return this.props.getIcon(feat.object);
  }

  _getIconSize(feat) {
    if (feat.properties.cluster) {
      // TODO: this was different, involved group icon and _getExpansionZoom
      return this.props.clusterIconSize;
    }
    // TODO: this was a ternary before
    return this.props.getIconSize;
  }

  _getExpansionZoom(feat) {
    return this.state.spatialIndex.getClusterExpansionZoom(
      feat.object.properties.cluster_id
    );
  }

  onClick(feat) {
    if (feat.object.properties.cluster) {
      const expansionZoom = this._getExpansionZoom(feat);
      return this.props.onClusterClick(expansionZoom);
    } else {
      return this.props.onClick(feat);
    }
  }

  renderLayers() {
    const { data } = this.state;
    const { iconAtlas, iconMapping, getPosition, updateTriggers } = this.props;

    /** Background icon for cluster */
    const iconLayer = new IconLayer(
      this.getSubLayerProps({
        id: 'icon',
        data,
        iconAtlas,
        iconMapping,
        getPosition,
        // TODO: try refactoring these
        getIcon: (feat) => this._getIcon(feat),
        getSize: (feat) => this._getIconSize(feat),
        updateTriggers: {
          getPosition: updateTriggers.getPosition,
          getIcon: updateTriggers.getIcon,
          getSize: updateTriggers.getIconSize,
          getColor: updateTriggers.getIconColor,
        },
      })
    );

    /** Number showing amount of leaves in cluster */
    const textLayer = new TextLayer(
      this.getSubLayerProps({
        id: 'text',
        data,
        getPosition,
        getText: this._getClusterText,
        getSize: () => 10,
        onClick: (f) => this.onClick(f),
        updateTriggers: {
          getPosition: updateTriggers.getPosition,
          getText: updateTriggers.getText,
          getSize: updateTriggers.getTextSize,
          getColor: updateTriggers.getTextColor,
        },
      })
    );

    return [iconLayer, textLayer];
  }
}

ClusteredGeoJsonIconLayer.layerName = 'ClusteredGeoJsonIconLayer';

export default ClusteredGeoJsonIconLayer;
