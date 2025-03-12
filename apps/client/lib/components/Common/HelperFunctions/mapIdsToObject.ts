import { FORM_ENUM } from '~/lib/utils/constants';

const mapIdsToObject = (
  addedIds: number[],
  removedIds: number[]
): Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete> | null => {
  if (addedIds.length === 0 && removedIds.length === 0) {
    return null;
  }
  const addedIdsMapping = addedIds.reduce(
    (acc, id) => {
      acc[id] = FORM_ENUM.add; // FORM_ENUM.add represents "Add"
      return acc;
    },
    {} as Record<number, number>
  );

  const removedIdsMapping = removedIds.reduce(
    (acc, id) => {
      acc[id] = FORM_ENUM.delete; // FORM_ENUM.delete represents "Delete"
      return acc;
    },
    {} as Record<number, number>
  );

  return { ...addedIdsMapping, ...removedIdsMapping };
};

export default mapIdsToObject;
