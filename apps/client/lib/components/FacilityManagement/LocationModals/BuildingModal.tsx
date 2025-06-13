/* eslint-disable no-unused-vars */
import { useFormikContext } from 'formik';
import BuildingModal from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/BuildingModal';
import {
  BuildingFormData,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Building = (props: BuildingModalProps) => {
  const { isOpen, onClose } = props;
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const handleSave = (data: BuildingFormData) => {
    setFieldValue('createBuildingDtos', [
      ...values.createBuildingDtos,
      {
        createBuildingDto: {
          ...data,
          facilityId: 0,
        },
        createFloorDtos: [],
      },
    ]);
    onClose();
  };

  return (
    <BuildingModal
      isOpen={isOpen}
      onClose={onClose}
      defaultFacilityId={0}
      handleSave={handleSave}
    >
      <></>
    </BuildingModal>
  );
};

export default Building;
