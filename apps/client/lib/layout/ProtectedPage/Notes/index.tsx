'use client';
import { HStack, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { FolderIcon } from '~/lib/components/CustomIcons';
import AllNotes from '~/lib/components/Notes/AllNotes';

interface NotesProps {
  isCollapse: boolean;
}

const Notes = (props: NotesProps) => {
  const { isCollapse } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const componentWidth = 100;
  const componentHeight = 40;

  const initialX = window.innerWidth - componentWidth - 20;
  const initialY = window.innerHeight / 2;

  const OPEN_SIDEBAR_POSITION = 260;

  const [position, setPosition] = useState({ x: initialX, y: initialY });

  const nodeRef = useRef(null);

  const handleStop: DraggableEventHandler = (e, data) => {
    const { x, y } = data;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const verticalMargin = windowHeight * 0.1;

    let newX;
    if (x + componentWidth / 2 > windowWidth / 2) {
      newX = windowWidth - componentWidth - 20;
    } else {
      newX = isCollapse ? 100 : OPEN_SIDEBAR_POSITION;
    }

    const newY = Math.min(
      Math.max(y, verticalMargin),
      windowHeight - componentHeight - verticalMargin
    );

    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    if (!isCollapse && position.x < OPEN_SIDEBAR_POSITION) {
      setPosition({ x: OPEN_SIDEBAR_POSITION, y: position.y });
    }

    if (isCollapse && position.x == OPEN_SIDEBAR_POSITION) {
      setPosition({ x: 100, y: position.y });
    }
  }, [isCollapse]);
  return (
    <Draggable
      position={position}
      onStop={handleStop}
      bounds="parent"
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        style={{
          position: 'fixed',
          zIndex: 999,
          transition: 'all 200ms ease-in-out',
        }}
      >
        <HStack
          px="12px"
          py="5px"
          pos="fixed"
          w="100px"
          h="40px"
          display="flex"
          alignItems="center"
          rounded="30px"
          gap="8px"
          cursor="pointer"
          transition="all 300ms ease-in-out"
          background="white"
          role="group"
          sx={{
            boxShadow: `
      0px 3px 6px rgba(0, 0, 0, 0.1),
      0px 10px 10px rgba(0, 0, 0, 0.09),
      0px 23px 14px rgba(0, 0, 0, 0.05),
      0px 40px 16px rgba(0, 0, 0, 0.01),
      0px 63px 18px rgba(0, 0, 0, 0.0)
    `,
          }}
          _hover={{
            transform: 'scale(1.1)',
          }}
          onClick={onOpen}
        >
          <Icon
            as={FolderIcon}
            transition="all 300ms ease-in-out"
            _groupHover={{ transform: 'rotate(15deg) scale(1.2)' }}
          />

          <Text color="#838383" size="md" fontWeight={700}>
            Notes
          </Text>

          <AllNotes onClose={onClose} isOpen={isOpen} />
        </HStack>
      </div>
    </Draggable>
  );
};

export default Notes;
