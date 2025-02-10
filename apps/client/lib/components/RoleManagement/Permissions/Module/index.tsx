import {
  Collapse,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { Module } from '~/lib/interfaces/module.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllSubModulesQuery } from '~/lib/redux/services/modules.services';
import { updateFormRoleModules } from '~/lib/redux/slices/RoleSlice';
import { checkIfModuleIsSelected } from '../../utils';
import { Permission } from './Permission';

const ModuleItem = ({ data }: { data: Module }) => {
  const { systemModuleContextTypeId, moduleContextTypeName, description } =
    data;
  const { onToggle, isOpen } = useDisclosure();
  const { data: submodules, isLoading } = useGetAllSubModulesQuery(
    { pageSize: 50, systemModuleContextTypeId: data.systemModuleContextTypeId },
    { skip: !isOpen }
  );
  const dispatch = useAppDispatch();
  const formRoleModules = useAppSelector((state) => state.role.formRoleModules);

  return (
    <VStack width="full">
      <HStack
        width="full"
        justifyContent="space-between"
        cursor="pointer"
        onClick={onToggle}
        bgColor={isOpen ? 'neutral.200' : 'white'}
        py="20px"
        px={{ base: '16px', lg: '32px' }}
      >
        <HStack
          spacing="16px"
          width={{ base: '90%', md: '60%' }}
          alignItems="flex-start"
        >
          <CheckBox
            isChecked={checkIfModuleIsSelected(formRoleModules, {
              systemModuleContextTypeId,
              systemSubModuleContextTypeId: null,
            })}
            handleChange={() =>
              dispatch(
                updateFormRoleModules({
                  roleSystemModuleContextPermissionId: null,
                  systemSubModuleContextTypeId: null,
                  systemModuleContextTypeId,
                })
              )
            }
          />
          <VStack
            spacing="8px"
            alignItems="flex-start"
            width={{ base: 'full', md: 'max-content' }}
          >
            <Text color="black" fontWeight={700}>
              {moduleContextTypeName}
            </Text>
            <Text
              textAlign="left"
              display={{ base: 'flex', md: 'none' }}
              width="full"
            >
              {description}
            </Text>
          </VStack>
        </HStack>
        <HStack
          width={{ base: '10%', md: '40%' }}
          position="relative"
          justifyContent="flex-start"
        >
          <Text
            maxW="90%"
            textAlign="left"
            display={{ base: 'none', md: 'flex' }}
          >
            {description}
          </Text>
          <Icon
            as={ChevronDownIcon}
            boxSize="16px"
            color="#374957"
            position="absolute"
            right={0}
            transition="transform 0.3s ease-out"
            transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
          />
        </HStack>
      </HStack>
      <Collapse in={isOpen} style={{ width: '100%' }}>
        <SimpleGrid
          width="full"
          spacing="74px"
          rowGap="20px"
          py="24px"
          px={{ base: '16px', lg: '32px' }}
          columns={{ base: 1, md: 2 }}
          maxW={{ lg: '80%' }}
        >
          {isLoading
            ? Array(4)
                .fill('')
                .map((_, index) => (
                  <Skeleton
                    width={{ base: 'full', md: '250px' }}
                    height="120px"
                    key={index}
                  />
                ))
            : submodules?.data?.items.map((data, index) => (
                <Permission
                  data={data}
                  key={index}
                  systemModuleContextTypeId={systemModuleContextTypeId}
                />
              ))}
        </SimpleGrid>
      </Collapse>
    </VStack>
  );
};

export default ModuleItem;
