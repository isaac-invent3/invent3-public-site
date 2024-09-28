import { MapContainer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import type { GeoJsonTypes } from 'geojson';
import {
  GeoJSONFeature,
  MapAssetData,
} from '~/lib/interfaces/general.interfaces';
import _ from 'lodash';

import '~/lib/styles/custom-leaflet.css';
import CustomMarker from './CustomMarker';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import LoadingSpinner from './LoadingSpinner';

interface GeoJSONData {
  type: GeoJsonTypes;
  features: GeoJSONFeature[];
}

// Define asset data type
interface AssetData {
  [lgaName: string]: MapAssetData;
}

interface LgaMapProps {
  assetData: AssetData;
  selectedState: MapAssetData;
}

const LgaMap = ({ assetData, selectedState }: LgaMapProps) => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const stateName =
    selectedState?.name === 'Abuja(FCT)' ? 'fct' : selectedState?.name;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/nigeria-geojson/${_.kebabCase(stateName.toLowerCase())}.geojson`
        );
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

  // Custom style for each state to match the uploaded image
  const mapStyle = {
    fillColor: '#b5b5b5',
    weight: 2,
    color: 'white',
    fillOpacity: 1,
  };

  return (
    <MapContainer
      style={{
        display: 'flex',
        flex: 1,
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: 'transparent',
      }} // Full width and height
      center={NIGERIA_CORDINATES.states?.[selectedState.name]}
      zoom={8}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      attributionControl={false}
      dragging={false}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        geoData && (
          <>
            <GeoJSON data={geoData} style={mapStyle} />
            {Object.keys(assetData).map((lgaName) => {
              if (assetData[lgaName] && assetData[lgaName].count > 0) {
                return (
                  <CustomMarker
                    name={lgaName}
                    assetCount={assetData[lgaName].count}
                    cordinates={
                      NIGERIA_CORDINATES?.[selectedState?.name as 'Abia']
                    }
                  />
                );
              }
              return null;
            })}
          </>
        )
      )}
    </MapContainer>
  );
};

export default LgaMap;
