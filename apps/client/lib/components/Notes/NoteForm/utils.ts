import { FORM_ENUM } from '~/lib/utils/constants';

export const generateTagChanges = (
  oldList: { name: string; id: number }[],
  newList: { name: string; id: number }[]
) => {
  const added = newList
    .filter((newUser) => !oldList.some((oldUser) => oldUser.id === newUser.id))
    .map((user) => ({
      key: FORM_ENUM.add,
      value: user.id,
    }));

  const deleted = oldList
    .filter((oldUser) => !newList.some((newUser) => newUser.id === oldUser.id))
    .map((user) => ({
      key: FORM_ENUM.delete,
      value: user.id,
    }));

  return [...added, ...deleted];
};
