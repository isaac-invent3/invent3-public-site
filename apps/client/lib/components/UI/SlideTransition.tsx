import { SlideFade } from '@chakra-ui/react';
import type React from 'react';

interface ISlideTransition {
  trigger: boolean;
  children: React.ReactNode;
  entryDelay?: number;
  exitDelay?: number;
  direction?: string;
}
const SlideTransition = ({
  trigger,
  children,
  entryDelay = 0.5,
  exitDelay = 0.5,
  direction,
}: ISlideTransition) => {
  return (
    <SlideFade
      in={trigger}
      offsetX="30px"
      offsetY="0"
      dir={direction ?? 'right'}
      transition={{
        exit: { duration: exitDelay },
        enter: { duration: entryDelay },
      }}
      style={{ minWidth: '100%' }}
    >
      {children}
    </SlideFade>
  );
};

export default SlideTransition;
