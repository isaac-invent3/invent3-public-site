import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import CustomMarker from './CustomMarker';
import { SingleMapAssetData } from '~/lib/interfaces/asset/general.interface';
import { LoadingSpinner } from '@repo/ui/components';
import { VStack } from '@chakra-ui/react';

interface GeoJSONData {
  type: string;
  features: any[];
}

// Define asset data type
interface AssetData {
  [stateName: string]: SingleMapAssetData;
}

interface StateMapProps {
  assetData: AssetData;
  setSelectedState: React.Dispatch<
    React.SetStateAction<SingleMapAssetData | null>
  >;
  currentAssetStatus: 'In Use' | 'Not in Use';
  type: 'count' | 'value';
}

const StateMap = (props: StateMapProps) => {
  const { assetData, setSelectedState, currentAssetStatus, type } = props;
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null); // Track hovered marker

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/nigeria-geojson/state.geojson');
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
    return (
      <VStack justifyContent="center" minHeight="50vh" width="full">
        <LoadingSpinner />
      </VStack>
    );
  }

  // Create a sorted list of markers, with the hovered marker placed last
  const sortedAssetData = Object.keys(assetData).sort((a, b) => {
    if (a === hoveredMarker) return 1;
    if (b === hoveredMarker) return -1;
    return 0;
  });

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 3600,
          center: [8.6753, 9.082], // Center on Nigeria's coordinates
        }}
        style={{
          width: '100%',
          // maxWidth: '1200px',
          height: 'max-content',
          position: 'relative',
        }}
      >
        {/* Geographies for rendering the map */}
        {geoData && (
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.state;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: '#b5b5b5',
                        stroke: 'white',
                        strokeWidth: 2,
                      },
                      hover: {
                        fill: '#b5b5b5BF',
                        stroke: 'white',
                        strokeWidth: 2,
                      },
                      pressed: { fill: '#b5b5b5BF' },
                    }}
                    onClick={() => {
                      if (assetData[stateName]) {
                        setSelectedState(assetData[stateName]);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}

        {/* Custom markers for each state with assets */}
        {sortedAssetData.map((stateName) => {
          if (
            assetData &&
            assetData?.[stateName] &&
            ((currentAssetStatus === 'In Use' &&
              assetData?.[stateName]?.assetInUseCount > 0) ||
              (currentAssetStatus === 'Not in Use' &&
                assetData?.[stateName]?.assetNoInUseCount > 0))
          ) {
            const coordinates =
              NIGERIA_CORDINATES.states[assetData?.[stateName].name];

            // Ensure the coordinates are valid
            let newCoordinates: [number, number] = [0, 0];
            if (coordinates && coordinates.length === 2) {
              newCoordinates = coordinates;
            }

            return (
              <CustomMarker
                key={stateName}
                name={stateName}
                type={type}
                isInUse={currentAssetStatus === 'In Use'}
                value={
                  currentAssetStatus === 'In Use'
                    ? assetData?.[stateName]?.activeAssetsTotalValue
                    : assetData?.[stateName]?.assetsNotInUseTotalValue
                }
                assetCount={
                  currentAssetStatus === 'In Use'
                    ? assetData?.[stateName]?.assetInUseCount
                    : assetData?.[stateName]?.assetNoInUseCount
                }
                coordinates={newCoordinates}
                setHoveredMarker={setHoveredMarker}
              />
            );
          }
          return null;
        })}
      </ComposableMap>
    </>
  );
};

export default StateMap;
