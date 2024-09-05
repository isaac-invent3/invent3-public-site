import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  type ResponsiveValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface IGenericDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  size?: ResponsiveValue<string>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const GenericDrawer = (props: IGenericDrawer) => {
  const { isOpen, onClose, children, header, footer, size = 'sm' } = props;
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
      size={size}
    >
      <DrawerOverlay
        height={`${innerHeight}px !important`}
        bgColor="#00000040"
      />
      <DrawerContent height={`${innerHeight}px !important`} pb="30px">
        <DrawerHeader>{header}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GenericDrawer;
