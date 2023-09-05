import { CompositeLayer, PickingInfo } from '@deck.gl/core/typed';
import { IconLayer, TextLayer } from '@deck.gl/layers/typed';
import Supercluster from 'supercluster';
import { Feature } from '~/types';

const DEFAULT_CLUSTER_MAX_ZOOM = 16;
const DEFAULT_CLUSTER_RADIUS = 40;
const DEFAULT_CLUSTER_ICON_NAME = 'cluster';

// TODO: change these
const COLOR_TRANSPARENT = [0, 0, 0, 0],
  COLOR_PRIMARY = [246, 190, 0, 255],
  COLOR_SECONDARY = [51, 63, 72, 255];

const SELECTED_CLUSTER_COLOR = [226, 123, 29];

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
    const { maxZoom, radius } = this.props;

    const shouldRebuildSpatialIndex =
      changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (shouldRebuildSpatialIndex) {
      const spatialIndex = new Supercluster({
        maxZoom,
        radius,
      });
      spatialIndex.load(
        props.data.map((datum) => ({
          geometry: { coordinates: this._getPosition(datum) },
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

  _getPinColor(feature: Feature) {
    if (
      feature.properties.cluster &&
      this._getExpansionZoom(feature) <= this.props.maxZoom
    ) {
      /** Get the points within the cluster */
      const leaves = this.state.spatialIndex.getLeaves(
        feature.properties.cluster_id,
        'Infinity'
      );

      const id = this.props.featureIdAccessor;

      /** Check if the selected item is part of this clustered feature */
      if (this.props.selectedFeature[id]) {
        const isMatch = leaves.find(
          (leaf) => leaf.properties[id] === this.props.selectedFeature[id]
        );
        if (isMatch) {
          return SELECTED_CLUSTER_COLOR;
        }
      }

      return COLOR_PRIMARY;
    }
    if (typeof this.props.getPinColor === 'function') {
      return this.props.getPinColor(feature);
    }
    if (Array.isArray(this.props.pinColor)) {
      return this.props.pinColor;
    }

    if (this.props.selectedFeature) {
      const id = this.props.featureIdAccessor;

      const isSelected =
        this.props.selectedFeature.properties?.[id] === feature.properties[id];

      return isSelected ? [255, 99, 71, 255] : [15, 10, 222, 255];
    }
    // TODO: what is this color? Default color?
    return [15, 10, 222, 255];
  }

  _getClusterText(feature: Feature) {
    const { cluster, point_count } = feature.properties;
    return cluster ? `${point_count}` : ` `;
  }

  _getIcon(feature: Feature) {
    if (feature.properties.cluster) {
      // TODO: this was different, involved group icon and _getExpansionZoom
      return this.props.clusterIconName;
    }
    // TODO: this was a ternary before
    return this.props.getIcon(feature);
  }

  _getIconSize(feature: Feature) {
    if (feature.properties.cluster) {
      // TODO: this was different, involved group icon and _getExpansionZoom
      return this.props.clusterIconSize;
    }
    // TODO: this was a ternary before
    return this.props.pinIconSize;
  }

  _getExpansionZoom(feature: Feature) {
    return this.state.spatialIndex.getClusterExpansionZoom(
      feature.properties.cluster_id
    );
  }

  onClick(info: PickingInfo) {
    const feature: Feature = info.object;
    if (feature.properties.cluster) {
      const expansionZoom = this._getExpansionZoom(feature);
      return this.props.onClusterClick(expansionZoom);
    } else {
      return this.props.onFeatureClick(feature);
    }
  }

  _getPosition(feature: Feature) {
    return feature.geometry.coordinates;
  }

  renderLayers() {
    const { data } = this.state;
    const { iconAtlas, iconMapping, textIconSize, updateTriggers } = this.props;

    /** Background icon for cluster/single pin */
    const iconLayer = new IconLayer(
      this.getSubLayerProps({
        id: 'icon-layer',
        data,
        iconAtlas,
        iconMapping,
        getPosition: (feature: Feature) => this._getPosition(feature),
        getIcon: (feature: Feature) => this._getIcon(feature),
        getSize: (feature: Feature) => this._getIconSize(feature),
        getColor: (feature: Feature) => this._getPinColor(feature),
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
        id: 'text-layer',
        data,
        getPosition: (feature: Feature) => this._getPosition(feature),
        getText: this._getClusterText,
        getSize: () => textIconSize,
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

ClusteredGeoJsonIconLayer.defaultProps = {
  pickable: true,
  fontFamily: 'Open Sans',
  fontWeight: 600,
  clusterIconName: DEFAULT_CLUSTER_ICON_NAME,
  maxZoom: DEFAULT_CLUSTER_MAX_ZOOM,
  radius: DEFAULT_CLUSTER_RADIUS,
  textIconSize: 15,
  pinIconSize: 40,
  iconSizeScale: 8,
  clusterIconSize: 40,
  hideTextOnGroup: true,
};

export default ClusteredGeoJsonIconLayer;
