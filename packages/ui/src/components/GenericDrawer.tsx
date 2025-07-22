import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface IGenericDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  customStyle?: Omit<DrawerProps, 'onClose' | 'isOpen' | 'children'>;
}

const GenericDrawer = (props: IGenericDrawer) => {
  const { isOpen, onClose, children, maxWidth } = props;
  const [innerHeight, setH] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 100
  );

  function windowResizeHandler() {
    if (window !== undefined) {
      setH(window.innerHeight);
    }
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', windowResizeHandler);
    }
    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      closeOnOverlayClick
      blockScrollOnMount={false}
      preserveScrollBarGap={true}
      trapFocus={false}
    >
      <DrawerOverlay
        height={`${innerHeight}px !important`}
        bgColor="#00000040"
      />
      <DrawerContent
        p={0}
        m={0}
        height={`${innerHeight}px !important`}
        sx={{ maxWidth: maxWidth ?? 'full', width: '100%' }}
        overflow="auto"
        position="relative"
        zIndex={999}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default GenericDrawer;
