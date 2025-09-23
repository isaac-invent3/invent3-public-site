import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { AssetIcon } from '~/lib/components/CustomIcons';

const CountMarker = () => {
  return (
    <Flex direction="column" position="absolute" width="full">
      <foreignObject x={-20} y={-20} width={40} height={40}>
        <Flex
          width="40px"
          height="40px"
          rounded="full"
          bgColor="none"
          justifyContent="center"
          alignItems="center"
          transition="background-color 0.3s ease"
        >
          <Flex
            rounded="full"
            bgColor="white"
            width="24px"
            height="24px"
            justifyContent="center"
            alignItems="center"
            transition="width 0.3s ease, height 0.3s ease"
          >
            <Flex
              rounded="full"
              borderWidth="1px"
              borderColor="#00A129"
              width="20px"
              height="20px"
              justifyContent="center"
              alignItems="center"
              transition="width 0.3s ease, height 0.3s ease"
            >
              <Icon
                as={AssetIcon}
                boxSize="16px"
                color="#00A129"
                position="relative"
                zIndex={9}
              />
            </Flex>
          </Flex>
        </Flex>
      </foreignObject>
    </Flex>
  );
};

export default CountMarker;
