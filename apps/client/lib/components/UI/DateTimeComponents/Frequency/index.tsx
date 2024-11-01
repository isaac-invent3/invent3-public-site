import React, { useEffect, useState } from 'react';
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
import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import ConditionalDateSelector from '../Common/ConditionalDateSelector';
import { ClockIcon } from '~/lib/components/CustomIcons';
import CustomSelectDateButton from '../Common/CustomSelectDateButton';
import AddTime from '../AddTime';
import RepeatFields from './RepeatFields';
import { useGetAllMaintenanceFrequenciesQuery } from '~/lib/redux/services/maintenance/frequency.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface FrequencyProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDateTime: string | null;
}

const Frequency = (props: FrequencyProps) => {
  const { isOpen, onClose, selectedDateTime } = props;
  const { data, isLoading } = useGetAllMaintenanceFrequenciesQuery({});
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const [frequencyInfo, setFrequencyInfo] = useState<FrequencyInfo>({
    interval: 1,
    repeat: null,
    startDate: null,
    endDate: null,
    repeatIntervals: [],
  });

  // Sets the first Frequency as default
  useEffect(() => {
    if (data?.data?.items) {
      const options = generateOptions(
        data?.data?.items,
        'frequencyName',
        'frequencyId'
      );
      if (options.length > 0) {
        setFrequencyInfo((prev) => ({ ...prev, repeat: options[0] as Option }));
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
                  selectedOption={frequencyInfo.repeat ?? undefined}
                  showTitleAfterSelect={false}
                  handleSelect={(option) =>
                    setFrequencyInfo((prev) => ({
                      ...prev,
                      repeat: option,
                      repeatIntervals:
                        option.value === frequencyInfo.repeat?.value
                          ? frequencyInfo.repeatIntervals
                          : [],
                    }))
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
                    value={frequencyInfo.interval}
                    handleValueChange={(value) =>
                      setFrequencyInfo((prev) => ({ ...prev, interval: value }))
                    }
                    handleDecrement={() =>
                      setFrequencyInfo((prev) => ({
                        ...prev,
                        interval:
                          frequencyInfo.interval > 1
                            ? frequencyInfo.interval - 1
                            : frequencyInfo.interval,
                      }))
                    }
                    handleIncrement={() =>
                      setFrequencyInfo((prev) => ({
                        ...prev,
                        interval:
                          frequencyInfo.interval < 100
                            ? frequencyInfo.interval + 1
                            : frequencyInfo.interval,
                      }))
                    }
                    customStyle={{ bgColor: 'transparent' }}
                  />
                  <Text textTransform="capitalize">
                    {frequencyInfo.repeat?.label}
                  </Text>
                </HStack>
              </HStack>
              <RepeatFields
                frequencyInfo={frequencyInfo}
                setFrequencyInfo={setFrequencyInfo}
                selectedDateTime={selectedDateTime}
              />

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
                    setFrequencyInfo((prev) => ({ ...prev, endDate: date }))
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
              <Button customStyles={{ width: '116px' }}>Done</Button>
            </HStack>
          </Flex>
        </ModalBody>
      </GenericModal>
      <AddTime
        isOpen={isOpenTime}
        onClose={onCloseTime}
        handleSelectedTime={() => {}}
      />
    </>
  );
};

export default Frequency;
