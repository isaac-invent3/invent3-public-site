import React, { useEffect } from 'react';
import GenericModal from '../../Modal';
import {
  Flex,
  HStack,
  Icon,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SectionInfo from '../../Form/FormSectionInfo';
import Button from '../../Button';
import SelectInput from '../../Select';
import NumberBox from '../Common/NumberBox';
import { Option } from '~/lib/interfaces/general.interfaces';
import ConditionalDateSelector from '../Common/ConditionalDateSelector';
import { ClockIcon } from '~/lib/components/CustomIcons';
import CustomSelectDateButton from '../Common/CustomSelectDateButton';
import AddTime from '../AddTime';
import RepeatFields from './RepeatFields';
import { useGetAllMaintenanceFrequenciesQuery } from '~/lib/redux/services/maintenance/frequency.services';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateFrequency } from '~/lib/redux/slices/DateSlice';

interface FrequencyProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDateTime: string | null;
}

const Frequency = (props: FrequencyProps) => {
  const { isOpen, onClose, selectedDateTime } = props;
  const dispatch = useAppDispatch();
  const dateInfo = useAppSelector((state) => state.date.info);
  const { data, isLoading } = useGetAllMaintenanceFrequenciesQuery({});
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();

  // Sets the first Frequency as default
  useEffect(() => {
    if (data?.data?.items) {
      const options = generateOptions(
        data?.data?.items,
        'frequencyName',
        'frequencyId'
      );
      if (options.length > 0) {
        dispatch(updateFrequency({ repeat: options[0] as Option }));
      }
    }
  }, [data]);

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { lg: '526px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <Flex
            width="full"
            direction="column"
            pt="32px"
            pl="32px"
            pr="27px"
            pb="19px"
          >
            <Text size="lg" color="primary.500" fontWeight={700}>
              Custom Occurence
            </Text>
            <VStack width="full" mt="50px" spacing="0px">
              <HStack width="full" spacing="29px" mb="32px">
                <SectionInfo
                  title="Repeats"
                  info="Add name that users can likely search with"
                  isRequired={false}
                  maxWidth="130px"
                />
                <SelectInput
                  name="repeat"
                  title="Repeat"
                  options={generateOptions(
                    data?.data?.items,
                    'frequencyName',
                    'frequencyId'
                  )}
                  isLoading={isLoading}
                  isSearchable
                  selectedOption={dateInfo.frequency.repeat ?? undefined}
                  showTitleAfterSelect={false}
                  handleSelect={(option) =>
                    dispatch(updateFrequency({ repeat: option }))
                  }
                />
              </HStack>

              <HStack width="full" spacing="29px" mb="32px">
                <SectionInfo
                  title="Interval"
                  info="Add name that users can likely search with"
                  isRequired={false}
                  maxWidth="130px"
                />
                <HStack spacing="24px">
                  <NumberBox
                    minNumber={1}
                    maxNumber={100}
                    value={dateInfo.frequency.interval}
                    handleValueChange={(value) =>
                      dispatch(updateFrequency({ interval: value }))
                    }
                    handleDecrement={() =>
                      dateInfo.frequency.interval > 1 &&
                      dispatch(
                        updateFrequency({
                          interval: dateInfo.frequency.interval - 1,
                        })
                      )
                    }
                    handleIncrement={() =>
                      dateInfo.frequency.interval < 100 &&
                      dispatch(
                        updateFrequency({
                          interval: dateInfo.frequency.interval + 1,
                        })
                      )
                    }
                    customStyle={{ bgColor: 'transparent' }}
                  />
                  <Text textTransform="capitalize">
                    {dateInfo.frequency.repeat?.label}
                  </Text>
                </HStack>
              </HStack>
              <RepeatFields selectedDateTime={selectedDateTime} />

              <HStack
                width="full"
                spacing="29px"
                alignItems="flex-start"
                mb="32px"
              >
                <SectionInfo
                  title="Starts"
                  info="Add name that users can likely search with"
                  isRequired={false}
                  maxWidth="130px"
                />
                <HStack spacing="24px" width="full">
                  <CustomSelectDateButton
                    customStyle={{ width: '179px', height: '50px' }}
                  />
                  <HStack spacing="8px" as="button" onClick={onOpenTime}>
                    <Icon as={ClockIcon} boxSize="16px" color="#374957" />
                    <Text color="primary.500">Add a time</Text>
                  </HStack>
                </HStack>
              </HStack>

              <HStack width="full" spacing="29px" alignItems="flex-start">
                <SectionInfo
                  title="Ends"
                  info="Add name that users can likely search with"
                  isRequired={false}
                  maxWidth="130px"
                />
                <ConditionalDateSelector
                  handleSelectedDate={(date) =>
                    dispatch(
                      updateFrequency({
                        endDate: date,
                      })
                    )
                  }
                />
              </HStack>
            </VStack>

            <HStack
              spacing="16px"
              width="full"
              mt="81px"
              justifyContent="flex-end"
            >
              <Button
                variant="secondary"
                customStyles={{ width: '116px' }}
                handleClick={onClose}
              >
                Cancel
              </Button>
              <Button
                customStyles={{ width: '116px' }}
                handleClick={() => console.log(dateInfo)}
              >
                Done
              </Button>
            </HStack>
          </Flex>
        </ModalBody>
      </GenericModal>
      {isOpenTime && (
        <AddTime
          isOpen={isOpenTime}
          onClose={onCloseTime}
          handleSelectedTime={() => {}}
        />
      )}
    </>
  );
};

export default Frequency;
