import React, { useState } from 'react';
import GenericModal from '../../Modal';
import {
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SectionInfo from '../../Form/FormSectionInfo';
import Button from '../../Button';
import SelectInput from '../../Select';
import NumberBox from '../Common/NumberBox';
import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import { repeatOptions } from '~/lib/utils/constants';
import ConditionalDateSelector from '../Common/ConditionalDateSelector';
import { ClockIcon } from '~/lib/components/CustomIcons';
import CustomSelectDateButton from '../Common/CustomSelectDateButton';
import AddTime from '../AddTime';
import RepeatFields from './RepeatFields';

interface FrequencyProps {
  isOpen: boolean;
  onClose: () => void;
}

const Frequency = (props: FrequencyProps) => {
  const { isOpen, onClose } = props;
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const [frequencyInfo, setFrequencyInfo] = useState<FrequencyInfo>({
    interval: 0,
    repeat: repeatOptions[0] as Option,
    startDate: null,
    endDate: null,
    repeatIntervals: [],
  });

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { lg: '526px' } }}
      >
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
          <VStack width="full" mt="50px" spacing="32px">
            <HStack width="full" spacing="29px">
              <SectionInfo
                title="Repeats"
                info="Add name that users can likely search with"
                isRequired={false}
                maxWidth="130px"
              />
              <SelectInput
                name="repeat"
                title="Repeat"
                options={repeatOptions}
                selectedOption={frequencyInfo.repeat}
                showTitleAfterSelect={false}
                handleSelect={(option) =>
                  setFrequencyInfo((prev) => ({ ...prev, repeat: option }))
                }
              />
            </HStack>

            <HStack width="full" spacing="29px">
              <SectionInfo
                title="Interval"
                info="Add name that users can likely search with"
                isRequired={false}
                maxWidth="130px"
              />
              <HStack spacing="24px">
                <NumberBox
                  minNumber={1}
                  value={frequencyInfo.interval}
                  handleValueChange={(value) =>
                    setFrequencyInfo((prev) => ({ ...prev, interval: value }))
                  }
                  handleDecrement={() =>
                    setFrequencyInfo((prev) => ({
                      ...prev,
                      interval:
                        frequencyInfo.interval > 0
                          ? frequencyInfo.interval - 1
                          : frequencyInfo.interval,
                    }))
                  }
                  handleIncrement={() =>
                    setFrequencyInfo((prev) => ({
                      ...prev,
                      interval: frequencyInfo.interval + 1,
                    }))
                  }
                  customStyle={{ bgColor: 'transparent' }}
                />
                <Text textTransform="capitalize">
                  {frequencyInfo.repeat.label}
                </Text>
              </HStack>
            </HStack>
            <RepeatFields
              frequencyInfo={frequencyInfo}
              setFrequencyInfo={setFrequencyInfo}
            />

            <HStack width="full" spacing="29px" alignItems="flex-start">
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
