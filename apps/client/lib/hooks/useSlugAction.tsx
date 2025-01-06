import { useEffect } from 'react';
import useUpdateSearchParams from './useUpdateSearchParams';

interface UseSlugActionProps {
  slugName: string;
  slugComparator: any;
  slugAction: () => void;
  onCloseHandler?: () => void;
}
const useSlugAction = (props: UseSlugActionProps) => {
  const { slugName, slugAction, slugComparator, onCloseHandler } = props;
  const { updateSearchParam, getSearchParam, clearSearchParamsAfter } =
    useUpdateSearchParams();

  const slugValue = getSearchParam(slugName);

  useEffect(() => {
    if (slugValue && slugValue == slugComparator) {
      slugAction();
    }
  }, [slugValue]);

  const closeAction = () => {
    onCloseHandler && onCloseHandler();

    clearSearchParamsAfter(slugName, { removeSelf: true });
  };

  const openAction = () => {
    updateSearchParam(slugName, slugComparator);
    slugAction();
  };

  return { closeAction, openAction };
};

export default useSlugAction;
