/* eslint-disable no-unused-vars */
import {
  CreateBuildingDto,
  FloorFormData,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';
import FloorModal from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/FloorModal';
import BuildingSelect from './LocationSelects/BuildingSelect';
import { useFormikContext } from 'formik';

interface FloorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Floor = (props: FloorModalProps) => {
  const { isOpen, onClose } = props;

  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const handleSave = (data: FloorFormData) => {
    const buildingIndex = values.createBuildingDtos.findIndex(
      (_b, i) => i === data.buildingId - 1
    );

    if (buildingIndex !== -1) {
      // Add floor to existing building
      const updatedBuildings = [...values.createBuildingDtos];
      const building = {
        ...updatedBuildings[buildingIndex],
      } as CreateBuildingDto;
      const floors = building.createFloorDtos
        ? [...building.createFloorDtos]
        : [];
      floors.push({ createFloorDto: { ...data }, createDepartmentDtos: [] });
      building.createFloorDtos = floors;
      updatedBuildings[buildingIndex] = building;
      setFieldValue('createBuildingDtos', updatedBuildings);
    }
    onClose();
  };

  return (
    <FloorModal
      isOpen={isOpen}
      onClose={onClose}
      defaultBuildingId={null}
      handleSave={handleSave}
    >
      <BuildingSelect />
    </FloorModal>
  );
};

export default Floor;
