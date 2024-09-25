import { MapContainer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Layer, Map, GeoJSON as GeoJSONType, LatLngExpression } from 'leaflet';
import '~/lib/styles/custom-leaflet.css';
import type { GeoJsonTypes } from 'geojson';
import { Text } from '@chakra-ui/react';

// Define TypeScript interfaces for GeoJSON properties and data
interface GeoJSONFeature {
  type: string;
  properties: {
    objectid: string;
    statecode: string;
    state: string; // State name
    capcity: string; // Capital city
    source: string;
    timestamp: string;
    globalid: string;
    shape_area: string;
    shape_len: string;
    geozone: string;
    cartodb_id: number;
    created_at: string;
    updated_at: string;
  };
  geometry: {
    type: GeoJsonTypes;
    coordinates: number[][][]; // Adjust this if the structure of the coordinates differs
  };
}

interface GeoJSONData {
  type: GeoJsonTypes;
  features: GeoJSONFeature[];
}

// Define asset data type
interface AssetData {
  [stateName: string]: number;
}

interface MapViewComponentProps {
  assetData: AssetData;
}

// Manually define the coordinates for each state
const stateCoordinates: { [key: string]: LatLngExpression } = {
  Lagos: [6.5244, 3.3792],
  Kano: [12.0022, 8.5919],
  Kaduna: [10.5104, 7.4383],
  Benue: [7.2913, 8.5814], // Example for Benue state
  // Add other states and their coordinates here
};

const MapViewComponent = ({ assetData }: MapViewComponentProps) => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/nigeria_geojson.geojson');
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
    const assetCount = assetData[stateName] || 0;

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
      click: (e: any) => {
        const map = e.target._map as Map;
        map.fitBounds(e.target.getBounds());
      },
    });
  };

  return (
    <MapContainer
      style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}
      center={[9.082, 8.6753]}
      zoom={6}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      // zoomControl={false}
      attributionControl={false}
      dragging={false}
    >
      {isLoading ? (
        <Text color="black">Loading GeoJSON data...</Text>
      ) : (
        geoData && (
          <>
            <GeoJSON
              data={geoData}
              style={mapStyle}
              onEachFeature={onEachState}
            />
            {/* Add markers for each state with assets */}
            {Object.keys(assetData).map((stateName) => {
              if (
                assetData[stateName] &&
                assetData[stateName] > 0 &&
                stateCoordinates[stateName]
              ) {
                return (
                  <Marker
                    key={stateName}
                    position={stateCoordinates[stateName]}
                  >
                    <Popup>{`${stateName}: ${assetData[stateName]} assets`}</Popup>
                  </Marker>
                );
              }

              return null; // No marker for states without assets
            })}
          </>
        )
      )}
    </MapContainer>
  );
};

export default MapViewComponent;
