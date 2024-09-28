import { MapContainer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Layer, GeoJSON as GeoJSONType } from 'leaflet';
import '~/lib/styles/custom-leaflet.css';
import type { GeoJsonTypes } from 'geojson';
import {
  GeoJSONFeature,
  MapAssetData,
} from '~/lib/interfaces/general.interfaces';
import CustomMarker from './CustomMarker';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import LoadingSpinner from './LoadingSpinner';

interface GeoJSONData {
  type: GeoJsonTypes;
  features: GeoJSONFeature[];
}

// Define asset data type
interface AssetData {
  [stateName: string]: MapAssetData;
}

interface StateMapProps {
  assetData: AssetData;
  setSelectedState: React.Dispatch<React.SetStateAction<MapAssetData | null>>;
}

const StateMap = ({ assetData, setSelectedState }: StateMapProps) => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

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

  // Custom style for each state to match the uploaded image
  const mapStyle = {
    fillColor: '#b5b5b5',
    weight: 2,
    color: 'white',
    fillOpacity: 1,
  };

  // Function to bind popup and event listeners to each state
  //@ts-ignore
  const onEachState = (state: GeoJSONType.Features, layer: Layer) => {
    const stateName = (state.properties as { state: string }).state;
    const assetCount = assetData[stateName]?.count || 0;

    layer.on({
      mouseover: (e: any) => {
        const targetLayer = e.target;
        targetLayer.setStyle({
          weight: 4,
          color: '#b5b5b5',
          fillOpacity: 0,
        });
        targetLayer.bindPopup(`${stateName}: ${assetCount} assets`).openPopup();
      },
      mouseout: (e: any) => {
        const targetLayer = e.target;
        targetLayer.setStyle(mapStyle);
        targetLayer.closePopup();
      },
      click: () => {
        if (assetData[stateName]) {
          setSelectedState(assetData[stateName]);
        }
      },
    });
  };

  return (
    <MapContainer
      style={{
        display: 'flex',
        flex: 1,
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: 'transparent',
        transform: 'scale(1.3)',
        transformOrigin: 'center',
      }} // Full width and height
      center={[9.082, 8.6753]}
      zoom={6}
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
            <GeoJSON
              data={geoData}
              style={mapStyle}
              onEachFeature={onEachState}
            />
            {Object.keys(assetData).map((stateName) => {
              if (assetData[stateName] && assetData[stateName].count > 0) {
                return (
                  <CustomMarker
                    name={stateName}
                    assetCount={assetData[stateName].count}
                    cordinates={NIGERIA_CORDINATES.states}
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

export default StateMap;
