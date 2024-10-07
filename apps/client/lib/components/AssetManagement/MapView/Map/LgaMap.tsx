import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useEffect, useState } from 'react';
import type { GeoJsonTypes } from 'geojson';
import { GeoJSONFeature } from '~/lib/interfaces/general.interfaces';
// import _ from 'lodash';

import CustomMarker from './CustomMarker';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import LoadingSpinner from './LoadingSpinner';
import { getScaleByStateSize } from '~/lib/utils/helperFunctions';
import { SingleMapAssetData } from '~/lib/interfaces/asset.interfaces';

interface GeoJSONData {
  type: GeoJsonTypes;
  features: GeoJSONFeature[];
}

// Define asset data type
interface AssetData {
  [lgaName: string]: SingleMapAssetData;
}

interface LgaMapProps {
  assetData: AssetData;
  selectedState: SingleMapAssetData;
  currentAssetStatus: string;
}

const LgaMap = (props: LgaMapProps) => {
  const { assetData, selectedState, currentAssetStatus } = props;
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null); // Track hovered marker

  // const stateName =
  //   selectedState?.name === 'Abuja(FCT)' ? 'fct' : selectedState?.name;

  // Create a sorted list of markers, with the hovered marker placed last
  const sortedAssetData = Object.keys(assetData).sort((a, b) => {
    if (a === hoveredMarker) return 1;
    if (b === hoveredMarker) return -1;
    return 0;
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/nigeria-geojson/state.geojson`);
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON data');
        }
        const data: GeoJSONData = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: getScaleByStateSize(selectedState.name),
        center: NIGERIA_CORDINATES.states?.[selectedState.name],
      }}
      style={{
        width: '100%',
        maxWidth: '1200px',
        height: 'max-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Geographies for rendering the map */}
      {geoData && (
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              if (geo.properties.state === selectedState.name) {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: '#b5b5b5',
                        stroke: 'white',
                        strokeWidth: 5,
                      },
                      hover: {
                        fill: '#b5b5b5',
                        stroke: 'white',
                        strokeWidth: 5,
                      },
                      pressed: {
                        fill: '#b5b5b5',
                        strokeWidth: 5,
                        stroke: 'white',
                      },
                    }}
                  />
                );
              }
              return null;
            })
          }
        </Geographies>
      )}

      {/* Custom markers for each state with assets */}
      {sortedAssetData.map((lgaName) => {
        if (
          assetData &&
          assetData?.[lgaName] &&
          ((currentAssetStatus === 'In Use' &&
            assetData?.[lgaName]?.assetInUseCount > 0) ||
            (currentAssetStatus === 'Not in Use' &&
              assetData?.[lgaName]?.assetNoInUseCount > 0))
        ) {
          const coordinates =
            NIGERIA_CORDINATES?.[selectedState.name as 'Abia']?.[
              assetData?.[lgaName].name
            ];

          // Ensure the coordinates are valid
          let newCoordinates: [number, number] = [0, 0];
          if (coordinates && coordinates.length === 2) {
            newCoordinates = [coordinates[1], coordinates[0]]; // latitude, longitude order
          }

          return (
            <CustomMarker
              key={lgaName}
              name={lgaName}
              isInUse={currentAssetStatus === 'In Use'}
              assetCount={
                currentAssetStatus === 'In Use'
                  ? assetData?.[lgaName]?.assetInUseCount
                  : assetData?.[lgaName]?.assetNoInUseCount
              }
              coordinates={newCoordinates}
              setHoveredMarker={setHoveredMarker}
            />
          );
        }
        return null;
      })}
    </ComposableMap>
  );
};

export default LgaMap;
