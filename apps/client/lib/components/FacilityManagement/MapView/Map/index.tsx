import { SingleMapFacilityData } from '~/lib/interfaces/location.interfaces';
import LgaMap from './LgaMap';
import StateMap from './StateMap';

interface MapViewComponentProps {
  selectedState: SingleMapFacilityData | null;
  setSelectedState: React.Dispatch<
    React.SetStateAction<SingleMapFacilityData | null>
  >;
  facilityData: { [name: string]: SingleMapFacilityData };
}
const MapViewComponent = (props: MapViewComponentProps) => {
  const { selectedState, setSelectedState, facilityData } = props;

  return selectedState?.name ? (
    <LgaMap selectedState={selectedState} facilityData={facilityData} />
  ) : (
    <StateMap facilityData={facilityData} setSelectedState={setSelectedState} />
  );
};

export default MapViewComponent;
