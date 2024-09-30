import React from 'react';
import { MapAssetData } from '~/lib/interfaces/general.interfaces';
import LgaMap from './LgaMap';
// import LgaMap from './templeaflet';
import StateMap from './StateMap';

interface MapViewComponentProps {
  selectedState: MapAssetData | null;
  setSelectedState: React.Dispatch<React.SetStateAction<MapAssetData | null>>;
  assetData: { [name: string]: MapAssetData };
}
const MapViewComponent = (props: MapViewComponentProps) => {
  const { selectedState, setSelectedState, assetData } = props;

  return selectedState?.name ? (
    <LgaMap selectedState={selectedState} assetData={assetData} />
  ) : (
    <StateMap assetData={assetData} setSelectedState={setSelectedState} />
  );
};

export default MapViewComponent;
