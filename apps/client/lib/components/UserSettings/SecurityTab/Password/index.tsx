import React from 'react';
import { Button } from '@repo/ui/components';
import SectionWrapper from '../../Common/SectionWrapper';
import { useDisclosure } from '@chakra-ui/react';
import ChangePasswordModal from './ChangePasswordModal';

const Password = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SectionWrapper
        title="Password"
        subtitle="Set a unique password to protect your account."
        sectionInfoWidth="212px"
        sectionInfoStyle={{ width: { base: '60%', md: '212px' } }}
      >
        <Button
          variant="secondary"
          customStyles={{
            width: 'max-content',
            height: { base: '35px', md: '50px' },
          }}
          handleClick={onOpen}
        >
          Change Password
        </Button>
      </SectionWrapper>
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Password;
