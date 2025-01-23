import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ProjectionFunction,
} from 'react-simple-maps';
// import { geoPath } from 'd3-geo';
import { hexbin } from 'd3-hexbin';
import * as d3 from 'd3';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const HexBinMap = ({
  data,
}: {
  data: { longitude: number; latitude: number }[];
}) => {
  const projection = d3
    .geoMercator()
    .scale(150)
    .translate([800 / 2, 450 / 2]); // Adjust scale and translation as needed
  // const pathGenerator = geoPath().projection(projection);

  // Generate hexbin layout
  const hexbinGenerator = hexbin()
    .radius(10) // Set the hexagon size
    .extent([
      [0, 0],
      [800, 450], // Dimensions of your map
    ]);

  // Transform data points to pixel locations
  const hexData = data.map((d) => projection([d.longitude, d.latitude]));

  // Generate hexagons
  const hexagons = hexbinGenerator(hexData as [number, number][]);

  return (
    <div>
      <ComposableMap
        projection={projection as unknown as ProjectionFunction}
        width={800}
        height={450}
      >
        {/* World Map */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: '#D6D6DA',
                    stroke: '#FFFFFF',
                    strokeWidth: 0.5,
                  },
                  hover: { fill: '#F53', stroke: '#FFFFFF', strokeWidth: 0.5 },
                  pressed: {
                    fill: '#E42',
                    stroke: '#FFFFFF',
                    strokeWidth: 0.5,
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* Hexagons */}
        {hexagons.map(
          (
            hex: {
              x: string | number | undefined;
              y: string | number | undefined;
              length: number;
            },
            i: React.Key | null | undefined
          ) => (
            <circle
              key={i}
              cx={hex.x}
              cy={hex.y}
              r={hex.length * 0.5} // Adjust size based on density
              fill="blue"
              fillOpacity={0.7}
              stroke="white"
              strokeWidth={0.5}
            />
          )
        )}
      </ComposableMap>
    </div>
  );
};

// Example usage
const sampleData = [
  { longitude: -74.006, latitude: 40.7128 }, // New York
  { longitude: -0.1276, latitude: 51.5074 }, // London
  { longitude: 2.3522, latitude: 48.8566 }, // Paris
  { longitude: 139.6917, latitude: 35.6895 }, // Tokyo
];

function HexMap() {
  return <HexBinMap data={sampleData} />;
}

export default HexMap;
