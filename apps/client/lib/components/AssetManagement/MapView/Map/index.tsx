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
  currentAssetStatus: 'In Use' | 'Not in Use';
  type: 'count' | 'value';
  assetData: { [name: string]: SingleMapAssetData };
}
const MapViewComponent = (props: MapViewComponentProps) => {
  const {
    selectedState,
    setSelectedState,
    assetData,
    currentAssetStatus,
    type,
  } = props;

  return selectedState?.name ? (
    <LgaMap
      selectedState={selectedState}
      assetData={assetData}
      currentAssetStatus={currentAssetStatus}
      type={type}
    />
  ) : (
    <StateMap
      assetData={assetData}
      setSelectedState={setSelectedState}
      currentAssetStatus={currentAssetStatus}
      type={type}
    />
  );
};

export default MapViewComponent;
