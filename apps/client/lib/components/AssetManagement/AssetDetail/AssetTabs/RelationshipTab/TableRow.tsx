import { Asset } from '~/lib/interfaces/asset.interfaces';
import AssetStatus from '../../../AssetStatus';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const TableRow = (asset: Asset) => {
  const {
    assetName,
    assetCode,
    assetCategory,
    assetSubCategory,
    brandName,
    modelRef,
    currentOwner,
    assignedTo,
    responsibleFor,
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
    acquisitionDate,
    purchaseDate,
    initialValue,
    resalevalue,
    scrapvalue,
    currentCost,
    maintenanceCost,
    lifeExpectancy,
    lastMaintenanceDate,
    nextMaintenanceDate,
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    dateCreated,
    currentStatus,
  } = asset;

  const details = [
    assetName,
    assetCode ?? 'N/A',
    assetCategory ?? 'N/A',
    assetSubCategory ?? 'N/A',
    brandName ?? 'N/A',
    modelRef ?? 'N/A',
    currentOwner ?? 'N/A',
    assignedTo ?? 'N/A',
    responsibleFor ?? 'N/A',
    facilityName ?? 'N/A',
    buildingName ?? 'N/A',
    floorName ?? 'N/A',
    departmentName ?? 'N/A',
    roomName ?? 'N/A',
    aisleName ?? 'N/A',
    shelfName ?? 'N/A',
    acquisitionDate ? dateFormatter(acquisitionDate) : 'N/A',
    purchaseDate ? dateFormatter(purchaseDate) : 'N/A',
    initialValue ? amountFormatter(initialValue) : 'N/A',
    resalevalue ? amountFormatter(resalevalue) : 'N/A',
    scrapvalue ? amountFormatter(scrapvalue) : 'N/A',
    currentCost ? amountFormatter(currentCost) : 'N/A',
    maintenanceCost ? amountFormatter(maintenanceCost) : 'N/A',
    lifeExpectancy
      ? `${lifeExpectancy} year${lifeExpectancy > 1 ? 's' : ''}`
      : 'N/A',
    lastMaintenanceDate ? dateFormatter(lastMaintenanceDate) : 'N/A',
    nextMaintenanceDate ? dateFormatter(nextMaintenanceDate) : 'N/A',
    weightKg ? `${weightKg}kg` : 'N/A',
    lengthCm ? `${lengthCm}cm` : 'N/A',
    widthCm ? `${widthCm}cm` : 'N/A',
    heightCm ? `${heightCm}cm` : 'N/A',
    dateCreated ? dateFormatter(dateCreated) : 'N/A',
    <AssetStatus status={currentStatus} />,
  ];
  return details;
};

export default TableRow;
