import { RoleModulePermission } from '~/lib/interfaces/role.interfaces';

const checkIfModuleIsSelected = (
  formRoleModules: RoleModulePermission[],
  option: {
    systemModuleContextTypeId: number | null;
    systemSubModuleContextTypeId: number | null;
  }
): boolean => {
  const existingIndex = formRoleModules.findIndex(
    (item) =>
      item.systemModuleContextTypeId === option.systemModuleContextTypeId &&
      item.systemSubModuleContextTypeId === option.systemSubModuleContextTypeId
  );

  if (existingIndex === -1) {
    return false;
  }
  return true;
};

export { checkIfModuleIsSelected };
