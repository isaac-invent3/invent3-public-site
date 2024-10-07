import React from 'react';
import LgaMap from './LgaMap';
// import LgaMap from './templeaflet';
import StateMap from './StateMap';
import { SingleMapAssetData } from '~/lib/interfaces/asset.interfaces';

interface MapViewComponentProps {
  selectedState: SingleMapAssetData | null;
  setSelectedState: React.Dispatch<
    React.SetStateAction<SingleMapAssetData | null>
  >;
  currentAssetStatus: string;
  assetData: { [name: string]: SingleMapAssetData };
}
const MapViewComponent = (props: MapViewComponentProps) => {
  const { selectedState, setSelectedState, assetData, currentAssetStatus } =
    props;

  return selectedState?.name ? (
    <LgaMap
      selectedState={selectedState}
      assetData={assetData}
      currentAssetStatus={currentAssetStatus}
    />
  ) : (
    <StateMap
      assetData={assetData}
      setSelectedState={setSelectedState}
      currentAssetStatus={currentAssetStatus}
    />
  );
};

export default MapViewComponent;
