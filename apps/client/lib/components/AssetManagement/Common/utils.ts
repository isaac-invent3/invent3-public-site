const saveSelectedAssetIds = (selectedAssetIds: number[]) => {
  localStorage.setItem('assetIds', JSON.stringify(selectedAssetIds));
};

const getSelectedAssetIds = (): number[] => {
  const savedAsset = localStorage.getItem('assetIds');
  return savedAsset ? JSON.parse(savedAsset) : [];
};

const removeSelectedAssetIds = () => {
  localStorage.removeItem('assetIds');
};
export { saveSelectedAssetIds, getSelectedAssetIds, removeSelectedAssetIds };
